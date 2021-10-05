import { Request, Response } from "express-serve-static-core";
import { BookItemInstance } from "../../models/bookItem";
import { RequestBookItemAttributes } from "../../interfaces";

class BookItemController {
  async createBookItem(req: Request, res: Response) {
    const requestData: RequestBookItemAttributes = { ...req.body };
    try {
      await BookItemInstance.create({ barcode: requestData.barcode, price: requestData.price, BookIsbn: requestData.isbn, LibraryId: requestData.libraryId });
      return res.json({ msg: "success" });
    } catch (error) {
      return res.json({ msg: 'error', status: 500, route: '/createBookItem'});
    }

  }
}

export default new BookItemController();
