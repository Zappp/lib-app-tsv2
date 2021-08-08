import express from "express"; 
import BookValidator from '../validator';
import Middleware from '../../middleware';
import BookController from '../controller';

const bookRouter = express.Router();

bookRouter.post(
  '/create',
  BookValidator.checkCreateBook(),
  Middleware.handleValidationError,
  BookController.create
);

bookRouter.get(
  '/read',
  BookValidator.checkReadBook(),
  Middleware.handleValidationError,
  BookController.read
);

bookRouter.get(
  '/read/:id',
  BookValidator.checkIdParam(),
  Middleware.handleValidationError,
  BookController.readById
);

bookRouter.put( //endpoint not working 
  '/update/:id',
  // BookValidator.checkIdParam(), //not sure if work
  BookValidator.checkTitle(),
  Middleware.handleValidationError,
  BookController.update
);

bookRouter.delete(
  '/delete/:id',
  BookValidator.checkIdParam(),
  Middleware.handleValidationError,
  BookController.delete
);

export default bookRouter;
