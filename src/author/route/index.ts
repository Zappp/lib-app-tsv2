import express from "express";
import AuthorValidator from '../validator';
import Middleware from '../../middleware';
import AuthorController from '../controller';

const authorRouter = express.Router();

authorRouter.post(
  '/create',
  AuthorValidator.checkCreateAuthor(),
  Middleware.handleValidationError,
  AuthorController.create
);

authorRouter.get(
  '/read',
  AuthorValidator.checkReadAuthor(),
  Middleware.handleValidationError,
  AuthorController.read
);

authorRouter.get(
  '/read/:id',
  AuthorValidator.checkIdParam(),
  Middleware.handleValidationError,
  AuthorController.readById
);

authorRouter.put(
  '/update/:id',
  AuthorValidator.checkUpdateAuthor(),
  Middleware.handleValidationError,
  AuthorController.update
);

authorRouter.delete(
  '/delete/:id',
  AuthorValidator.checkIdParam(),
  Middleware.handleValidationError,
  AuthorController.delete
);

export default authorRouter;
