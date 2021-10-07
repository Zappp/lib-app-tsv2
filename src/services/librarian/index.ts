import { BookItemInstance } from "../../models/bookItem";
import { AuthorAttributes, RequestBookAttributes, RequestBookItemAttributes } from "../../interfaces";
import { AuthorInstance } from "../../models/author";
import { BookInstance } from "../../models/book";
import { BookHasAuthorsInstance } from "../../models/bookHasAuthors";
import { LibraryInstance } from "../../models/library";


class LibrarianService {
  async createBook(requestData: RequestBookAttributes): Promise<string> {
    try {
      await BookInstance.findByPk(requestData.isbn).then(book => {
        if (book) {
          throw 'book already in database'
        }
      });
      await BookInstance.create(requestData);
      requestData.authors.forEach(async (author: AuthorAttributes) => {
        let authorExists = await AuthorInstance.findByPk(author.id);
        if (!authorExists) {
          await AuthorInstance.create(author);
        }
        await BookHasAuthorsInstance.create({
          BookIsbn: requestData.isbn,
          AuthorId: author.id
        });
      });
      return Promise.resolve('success');
    } catch (error) {
      throw error;
    }
  }

  async createBookItem(requestData: RequestBookItemAttributes): Promise<string> {
    try {
      await LibraryInstance.findByPk(requestData.libraryId)
        .then(library => {
          if (!library) {
            throw 'library does not exist';
          }
        });

      await BookItemInstance.findByPk(requestData.barcode)
        .then(bookItem => {
          if (bookItem) {
            throw 'bookItem already in database';
          }
        });

      await this.createBook(requestData)
        .catch(error => {
          if (error !== 'book already in database') {
            throw error.message;
          }
        });

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
