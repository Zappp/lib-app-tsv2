import { RequestBookAttributes } from "../../interfaces";
import BookInstance from "../../models/book";
import AuthorInstance from "../../models/author";
import Book_has_authorInstance from "../../models/book_has_author";

class BookService {
  async createBook(requestData: RequestBookAttributes) {
    await BookInstance.create(requestData);
    requestData.authors.forEach(async author => {
      const authorExists = await AuthorInstance.findOne({ where: { id: author.id } });
      if (!authorExists) {
        await AuthorInstance.create(author);
      }
      await Book_has_authorInstance.create(
        { BookInstanceId: requestData.isbn, AuthorInstanceId: author.id });
    });
  }
}
export default new BookService();
