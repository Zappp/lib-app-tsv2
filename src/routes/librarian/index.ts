import express from "express";
import BookValidator from "../../validators/book";
import BookItemValidator from "../../validators/bookItem";
import LibrarianController from "../../controllers/librarian";
import Middleware from "../../middleware";

const librarianRouter = express.Router();  

librarianRouter.post(
  '/createBookItem',
  BookValidator.checkCreateBook(),
  BookItemValidator.checkCreateBookItem(),
  Middleware.handleValidationError,
  LibrarianController.createBook,
  LibrarianController.createBookItem
);

librarianRouter.post(
  '/createBook',
  BookValidator.checkCreateBook(),
  Middleware.handleValidationError,
  LibrarianController.createBook
);

export default librarianRouter;
