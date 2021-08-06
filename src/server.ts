import express, { NextFunction, Request, Response } from 'express';
import { sequalize } from './config/database.config';
import { BookInstance } from './model';
import { BookValidator } from './validator';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

const app = express();
app.use(express.json());

(async () => { // chyba nie dziala
  try {
    await sequalize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

app.post(
  '/create',
  BookValidator.checkCreateBook(),
  (req: Request,res: Response,next: NextFunction) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
      return res.json(error);
    }
    next();
  },
  async (req: Request, res: Response) => {
    sequalize.sync();
    try {
      const record = await BookInstance.create({ ...req.body });
      res.json({ record, msg: "success" });
    } catch (error) {
      res.json({ msg: "failure", status: 500, route: '/create' });
    };
  });



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
