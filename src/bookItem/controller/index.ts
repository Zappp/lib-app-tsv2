import { Request, Response } from "express";
import BookItemService from '../service';
import { RequestBookItemAttributes } from '../../interfaces';

class BookItemController {
  async handleCreateBookItem(req: Request, res: Response) {
    const requestData: RequestBookItemAttributes = { ...req.body };
    try {
      await BookItemService.createBookItem(requestData);
      res.json({ msg: 'success' });
    } catch (error) {
      res.json({ msg: 'error', status: 500, route: '/createBookItem' });
    }
  }
}
export default new BookItemController();
