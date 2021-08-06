import express, { Request, Response } from 'express';
import { db2 } from './config/database.config';
import { BookInstance } from './model';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const authenticate = async () => {
  try {
    await db2.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.post('/create', (req: Request, res: Response) => {
  const id = uuidv4();
  try {
    // db2.sync({force: true})
    const record =  BookInstance.create({...req.body});
    console.log(record);
    res.json({ record, msg: "success" });
  } catch (error) {
    res.json({ msg: "failure", status: 500, route: '/create' });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
