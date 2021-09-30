import { Request, Response } from "express";
import { RequestBookAttributes } from "../../interfaces";
import BookInstance from "../../models/book";

class BookController {
  async createBook(req: Request, res: Response) {
    const requestData: RequestBookAttributes = { ...req.body };
    try { 
      await BookInstance.create(requestData);
      res.json({ msg: 'success' });
    } catch (error) {
      res.json({ msg: 'error', status: 500, route: '/create' });
    }
  }

  async read(req: Request, res: Response) {
    const limit = req.query?.limit as unknown as number;
    try {
      const record = await BookInstance.findAll({ where: {}, limit });
      res.json({ record, msg: 'success' });
    } catch (error) {
      res.json({ msg: 'error', status: 500, route: '/read' });
    }
  }

  async readById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const record = await BookInstance.findOne({ where: { id } });
      res.json({ record, msg: 'success' });
    } catch (error) {
      res.json({ msg: 'error', status: 500, route: '/read/:id' })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const record = await BookInstance.findOne({ where: { id } });
      if (!record) {
        res.json({ msg: 'error', status: 500, route: 'update/:id' });
      }
      const updatedRecord = await record?.update({ ...req.body });
      res.json({ record: updatedRecord, msg: 'success' });
    } catch (error) {
      res.json({ msg: 'error', status: 500, route: '/update/:id' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const record = await BookInstance.findOne({ where: { id } });
      if (!record) {
        res.json({ msg: 'error', status: 500, route: '/delete/:id' });
      }
      const deletedRecord = await record?.destroy();
      res.json({ record: deletedRecord, msg: 'success' });
    } catch (error) {
      res.json({ msg: 'error', status: 500, route: '/read/:id' })
    }
  }
}
export default new BookController();