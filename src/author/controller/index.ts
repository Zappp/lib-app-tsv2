import { Request, Response } from "express";
import AuthorInstance from "../../models/author";

class AuthorController {
  
async create(req: Request, res: Response) {
  try {
    const record = await AuthorInstance.create({ ...req.body });
    res.json({ record, msg: 'success' });
  } catch (error) {
    res.json({ msg: 'error', status: 500, route: '/create' });
  }
}

async read(req: Request, res: Response) {
  const limit = req.query?.limit as number | undefined;
  try {
    const record = await AuthorInstance.findAll({ where: {}, limit });
    res.json({ record, msg: 'success' });
  } catch (error) {
    res.json({ msg: 'error', status: 500, route: '/read' });
  }
}

async readById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const record = await AuthorInstance.findOne({ where: { id } });
    res.json({ record, msg: 'success' });
  } catch (error) {
    res.json({ msg: 'error', status: 500, route: '/read/:id' })
  }
}

async update(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const record = await AuthorInstance.findOne({ where: { id } });
    if (!record) {
      res.json({ msg: 'error', status: 500, route: 'update/:id' });
    }
    const updatedRecord = await record?.update({ ...req.body });
    res.json({ record: updatedRecord, msg: 'success' });
  } catch (error) {
    res.json({ msg: 'error', status: 500, route: '/update/:id' });
  }
}

async delete (req: Request, res: Response) {
  const { id } = req.params;
  try {
    const record = await AuthorInstance.findOne({ where: { id } });
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
export default new AuthorController();
