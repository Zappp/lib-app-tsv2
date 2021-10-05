import { Request, Response } from "express-serve-static-core";
import { BookItemInstance } from "../../models/bookItem";
import { RequestBookItemAttributes } from "../../interfaces";
import { LibraryInstance } from "../../models/library";

class BookItemController {
  async createBookItem(req: Request, res: Response) {
    const requestData: RequestBookItemAttributes = { ...req.body };
    try {
      const libraryExists = await LibraryInstance.findByPk(requestData.libraryId);
      if (libraryExists) {
        const bookItemExists = await BookItemInstance.findByPk(requestData.barcode);
        if (!bookItemExists) {
          await BookItemInstance.create({ barcode: requestData.barcode, price: requestData.price, BookIsbn: requestData.isbn, LibraryId: requestData.libraryId });
        }
        res.json({ msg: "success" });
      }
      res.json({ msg: 'library does not exist' });
    } catch (error) {
      res.json({ msg: 'error', status: 500, route: '/createBookItem', error });
    }

  }
}

export default new BookItemController();
