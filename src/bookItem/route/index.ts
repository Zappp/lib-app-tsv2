import express from "express";
import BookValidator from '../validator';
import Middleware from '../../middleware';
import BookItemController from '../controller';

const bookItemRouter = express.Router();

bookItemRouter.post(
  '/createBookItem',
  BookValidator.checkCreateBookItem(),
  Middleware.handleValidationError,
  BookItemController.handleCreateBookItem
);
export default bookItemRouter;
