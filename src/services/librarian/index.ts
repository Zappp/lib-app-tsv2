import { BookItemInstance } from "../../models/bookItem";
import { AuthorAttributes, RequestBookAttributes, RequestBookItemAttributes } from "../../interfaces";
import { AuthorInstance } from "../../models/author";
import { BookInstance } from "../../models/book";
import { BookHasAuthorsInstance } from "../../models/bookHasAuthors";
import { LibraryInstance } from "../../models/library";


class LibrarianService {
  async createBook(requestData: RequestBookAttributes): Promise<string> {
    try {
      const bookExists = await BookInstance.findByPk(requestData.isbn);
      if (!bookExists) {
        await BookInstance.create(requestData);
        requestData.authors.forEach(async (author: AuthorAttributes) => {
          let authorExists = await AuthorInstance.findByPk(author.id);
          if (!authorExists) {
            await AuthorInstance.create(author);
          }
          await BookHasAuthorsInstance.create({
            BookIsbn: requestData.isbn,
            AuthorId: author.id
          }
          );
        });
        return Promise.resolve('success');
      }
      return Promise.resolve('book already in database');
    } catch (error) {
      throw 'cannot create book';
    }
  }

  async createBookItem(requestData: RequestBookItemAttributes): Promise<string> {
    try {
      const libraryExists = await LibraryInstance.findByPk(requestData.libraryId)
      if (!libraryExists) {
        throw 'library does not exist';
      }
      const bookItemExists = await BookItemInstance.findByPk(requestData.barcode);
      if (bookItemExists) {
        throw 'bookItem already exists';
      }
      await this.createBook(requestData);
      await BookItemInstance.create({
        barcode: requestData.barcode,
        price: requestData.price,
        BookIsbn: requestData.isbn,
        LibraryId: requestData.libraryId
      });
      return Promise.resolve('success');
    } catch (error) {
      throw error;
    }
  }
}

export default new LibrarianService();
