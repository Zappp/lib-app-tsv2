import express from "express";
import BookValidator from "../../validators/book";
import BookItemValidator from "../../validators/bookItem";
import BookItemController from "../../controllers/bookItem";
import Middleware from "../../middleware";
import BookController from "../../controllers/book";

const bookItemRouter = express.Router();  

bookItemRouter.post(
  '/createBookItem',
  BookValidator.checkCreateBook(),
  BookItemValidator.checkCreateBookItem(),
  Middleware.handleValidationError,
  BookController.createBook,
  BookItemController.createBookItem
);

export default bookItemRouter;
