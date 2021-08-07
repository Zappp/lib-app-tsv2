import { Request, Response } from "express";
import { title } from "process";
import BookInstance from "../model";

class BookController {

  async create(req: Request, res: Response) {
    try {
      const record = await BookInstance.create({ ...req.body });
      console.log(record);
      res.json({ record, msg: 'success' });
    } catch (error) {
      console.log(error);
      res.json({ msg: 'error', status: 500, route: '/create' });
    }
  }

  async read(req: Request, res: Response) {
    const limit = req.query?.limit as number | undefined;
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
        res.json({ msg: 'error', status: '500', route: 'update' });
      }
      const updatedRecord = await record?.update({ ...req.body })
      res.json({ record: updatedRecord, msg: 'success' });
    } catch (error) {
      res.json({ msg: 'error', status: 500, route: '/read/:id' })
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
