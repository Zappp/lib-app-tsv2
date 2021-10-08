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
    LibrarianController.createBookItemController
);

librarianRouter.post(
    '/createBook',
    BookValidator.checkCreateBook(),
    Middleware.handleValidationError,
    LibrarianController.createBookController
);

export default librarianRouter;
