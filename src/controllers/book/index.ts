import { Request, Response } from "express";
import { AuthorAttributes, RequestBookAttributes } from "../../interfaces";
import { AuthorInstance } from "../../models/author";
import { BookInstance } from "../../models/book";
import {BookAuthorsInstance} from "../../models/bookAuthors";

class BookController {
  async createBook(req: Request, res: Response) {
    const requestData: RequestBookAttributes = { ...req.body };
    try {
      const bookExists = await BookInstance.findOne({ where: { isbn: requestData.isbn } });
      if (!bookExists) {
        await BookInstance.create(requestData);
        requestData.authors.forEach(async (author: AuthorAttributes) => {
          const authorExists = await AuthorInstance.findOne({ where: { id: author.id } });
          if (!authorExists) {
            await AuthorInstance.create(author);
          }
          await BookAuthorsInstance.create({ BookIsbn: requestData.isbn, AuthorId: author.id });
        });
      }
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
