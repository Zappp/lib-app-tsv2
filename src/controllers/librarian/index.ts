import { Request, Response } from "express-serve-static-core";
import { RequestBookItemAttributes } from "../../interfaces";
import { RequestBookAttributes } from "../../interfaces";
import LibrarianService from "../../services/librarian";


class LibrarianController {
    async createBookItemController(req: Request, res: Response) {
        const requestData: RequestBookItemAttributes = { ...req.body };
        try {
            const resolveMsg = await LibrarianService.createBookItem(requestData);
            return res.json({ msg: resolveMsg });
        } catch (error) {
            return res.json({ msg: error, status: 500, route: '/createBookItem' });
        }
    }

    async createBookController(req: Request, res: Response) {
        const requestData: RequestBookAttributes = { ...req.body };
        try {
            const resolveMsg = await LibrarianService.createBook(requestData);
            return res.json({ msg: resolveMsg });
        } catch (error) {
            return res.json({ msg: error, status: 500, route: '/createBook' });
        }
    }
}

export default new LibrarianController();
