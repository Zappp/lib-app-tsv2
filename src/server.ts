import express from 'express';
import { sequelize } from './config/database.config';
import bookRouter from './book/route';
import authorRouter from './author/route';

async () => { //not working
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const app = express();

sequelize.sync({ force: true });

app.use(express.json());
app.use('/api', bookRouter);
app.use('/api', authorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
