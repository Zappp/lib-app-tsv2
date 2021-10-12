import { sequelize } from '../config/database.config';
import session from 'express-session';

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sessionStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 30 * 1000  // The maximum age (in milliseconds) of a valid session.
});

export default sessionStore;
