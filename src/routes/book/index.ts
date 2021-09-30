import express from "express";
import BookValidator from '../../validators/book';
import Middleware from '../../middleware';
import BookController from '../../controllers/book';

const bookRouter = express.Router();

bookRouter.post(
  '/createBook',
  BookValidator.checkCreateBook(),
  Middleware.handleValidationError,
  BookController.createBook
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

bookRouter.put(
  '/update/:id',
  BookValidator.checkUpdateBook(),
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
