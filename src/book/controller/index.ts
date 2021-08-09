import { Request, Response } from "express";
import Book_has_authorInstance from "../../models/book_has_author";
import AuthorInstance from "../../models/author";
import BookInstance from "../../models/book";
import { Book_has_authorInterface } from "../../interfaces";


class BookController {
  async create(req: Request, res: Response) {
    const requestData: Book_has_authorInterface = { ...req.body };
    try {
      await BookInstance.create(requestData.book);
      requestData.authors.forEach(async author => {
        await AuthorInstance.create(author);
        await Book_has_authorInstance.create({ BookInstanceId: requestData.book.id, AuthorInstanceId: author.id })
      });
      res.json({ msg: 'success' });
    } catch (error) {
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
