import { RequestBookItemAttributes } from "../../interfaces";
import BookItemInstance from "../../models/bookItem";
import BookService from '../../book/service';

class BookItemService {
  async createBookItem(requestData: RequestBookItemAttributes) {
    await BookService.createBook(requestData);
    await BookItemInstance.create(requestData);
  }
}
export default new BookItemService();
