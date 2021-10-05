import { NextFunction, Request, Response } from "express";
import { AuthorAttributes, RequestBookAttributes } from "../../interfaces";
import { AuthorInstance } from "../../models/author";
import { BookInstance } from "../../models/book";
import { BookHasAuthorsInstance } from "../../models/bookHasAuthors";

class BookController {
  async createBook(req: Request, res: Response, next: NextFunction) {
    const requestData: RequestBookAttributes = { ...req.body };
    try {
      await BookInstance.create(requestData);
      requestData.authors.forEach(async (author: AuthorAttributes) => {
        let authorExists = await AuthorInstance.findByPk(author.id);
        if (!authorExists) {
          await AuthorInstance.create(author);
        }
        await BookHasAuthorsInstance.create({ BookIsbn: requestData.isbn, AuthorId: author.id });
      });
      next();
    } catch (error) {
      return res.json({ msg: 'error', status: 500, route: '/createBook' });
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
