import { Request, Response, NextFunction } from "express-serve-static-core";
import { BookItemInstance } from "../../models/bookItem";
import { RequestBookItemAttributes } from "../../interfaces";
import { AuthorAttributes, RequestBookAttributes } from "../../interfaces";
import { AuthorInstance } from "../../models/author";
import { BookInstance } from "../../models/book";
import { BookHasAuthorsInstance } from "../../models/bookHasAuthors";

class LibrarianController {

  async createBookItem(req: Request, res: Response) {
    const requestData: RequestBookItemAttributes = { ...req.body };
    try {
      await BookItemInstance.create({ barcode: requestData.barcode, price: requestData.price, BookIsbn: requestData.isbn, LibraryId: requestData.libraryId });
      return res.json({ msg: "success" });
    } catch (error) {
      return res.json({ msg: 'error', status: 500, route: '/createBookItem' });
    }
  }

  async createBook(req: Request, res: Response, next: NextFunction) {
    const requestData: RequestBookAttributes = { ...req.body };
    try {
      const bookExists = await BookInstance.findByPk(requestData.isbn);
      if (!bookExists) {
        await BookInstance.create(requestData);
        requestData.authors.forEach(async (author: AuthorAttributes) => {
          let authorExists = await AuthorInstance.findByPk(author.id);
          if (!authorExists) {
            await AuthorInstance.create(author);
          }
          await BookHasAuthorsInstance.create({ BookIsbn: requestData.isbn, AuthorId: author.id });
        });
      }
      next();
    } catch (error) {
      return res.json({ msg: 'error', status: 500, route: '/createBook' });
    }
  }
}

export default new LibrarianController();
