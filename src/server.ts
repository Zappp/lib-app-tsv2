import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import passport from "passport";
import librarianRouter from './routes/librarian';
import account from './models/account';
import sessionStore from "./config/sessionStore";
import passportLocal from 'passport-local';
import { validPassword, genPassword } from "./utils";


// import { sequelize } from './config/database.config'; // not working but later maybe added to program
// import { LibraryInstance } from './models/library';
// async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         await LibraryInstance.create({
//             id: '8f5c0500-753d-4ea9-9938-a9b4c8567100', name: 'Library1'
//         });
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }


interface User {
    id?: string
}

const LocalStrategy = passportLocal.Strategy;
const app = express();

app.use(express.json());

passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => { // co z async? czy dziala w paswport --> docs
    await account.findByPk(id)
        .then((account) => {
            if (!account) { throw new Error }
            done(null, account);
        }).catch(error => { done(error) });
});

passport.use('local', new LocalStrategy( //used on call of authenticate(), porownuje obiekt ktory dostala z baza danych
    async (username, password, done) => { //any?, czy dziala async --> docs
        await account.findOne({ where: { username: username } })
            .then(account => {
                if (!account) { done(null, false) }
                if (!validPassword(password, account!.hash, account!.salt)) { done(null, false) }
                return (done(null, account));
            })
            .catch(error => {
                done(error);
            });
    }
));

app.use( //express calls session middleware which checks cookie in req object - if theres no cookie, middleware will create session and set coockie in client's browser ?
    session({
        secret: "super secret", //process.env.secret = long random generated string
        store: sessionStore,
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 1000
        },
        // proxy: true, // if you do SSL outside of node.

    })
);
app.use(passport.initialize()); //working and looking for req.session.passport property
app.use(passport.session());    //working and looking for req.session.passport property

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/register', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

app.post('/register', async (req, res, next) => {

    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    await account.create({
        username: req.body.username,
        hash: hash,
        salt: salt
    }).then(() => { res.redirect('/login'); });

});

app.get('/login', (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

app.post('/login',
    passport.authenticate('local', { //returns user object that was validated, attaches request.session.passport property, serializes the user via passport.serializeUser(),attaches the serialized user.id to the req.session.passport.user property, attaches the full user object to req.user
        successRedirect: '/login-success',
        failureRedirect: '/login-failure',
    }),
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err) next(err);
    }
)

app.get('/protected-route', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1>');
    } else {
        res.send('<h1>You are not authenticated</h1>');
    }
});

app.get('/logout', (req, res) => { // Visiting this route logs the user out
    req.logout();
    res.redirect('/login');
});

app.get('/login-success', (req, res) => {
    res.send('<h1>You successfully logged in.<h1>');
});

app.get('/login-failure', (req, res) => {
    res.send('<h1>You entered the wrong password.<h1>');
});

////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api/librarian', librarianRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
