import express, { Request, Response } from 'express';
import { sequalize } from './config/database.config';
import { BookInstance } from './model';
import BookValidator from './validator';
import { v4 as uuidv4 } from 'uuid';
import Middleware from './middleware';

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
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    sequalize.sync();
    try {
      const record = await BookInstance.create({ ...req.body });
      res.json({ record, msg: "success" });
    } catch (error) {
      res.json({ msg: "failure", status: 500, route: '/create' });
    };
  }
);

app.get(
  '/read',
  BookValidator.checkReadBook(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const limit = req.query?.limit as number | undefined; //hmm mimo type assertion wypluwa stringa ktory jest dobrze czekowny w validatorze o dziwo 
    const offset = req.query?.offset as number | undefined;
    try {
      const records = await BookInstance.findAll({ where: {}, limit, offset });
      res.json(records);
    } catch (error) {
      res.json({ msg: 'failed to read', status: 500, route: '/read' });
    }
  }
);

app.get(
  '/read/:id',
  BookValidator.checkIdParam(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const record = await BookInstance.findOne({ where: { id } });
      res.json(record);
    } catch (error) {
      res.json({ msg: 'failed to read', status: 500, route: '/read:id' });
    }
  }
);

app.put(
  '/update/:id',
  BookValidator.checkIdParam(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const record = await BookInstance.findOne({ where: { id } });
      if (!record) {
        res.json({ msg: 'cannot find record' });
      }
      const updateRecord = await record?.update({ completed: !record.getDataValue('completed') });
      res.json({ record: updateRecord });
    } catch (error) {
      res.json({ msg: 'failed to update', status: 500, route: '/update/:id ' });
    }
  }
);

app.delete(
  '/delete/:id',
  BookValidator.checkIdParam(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const record = await BookInstance.findOne({ where: { id } });
      if (!record) {
        res.json({ msg: 'cannot find record' });
      }
      const deletedRecord = await record?.destroy()
      res.json({ record: deletedRecord });
    } catch (error) {
      res.json({ msg: 'failed to delete', status: 500, route: '/delete/:id' });
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
