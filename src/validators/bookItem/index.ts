import { body } from 'express-validator';

class BookItemValidator {
    checkCreateBookItem() {
        return [
            body('libraryId')
                .notEmpty()
                .withMessage('libraryId not empty')
                .isUUID(4)
                .withMessage('value is not uuidv4'),
            body('barcode')
                .optional() // prod => notempty)
                .isUUID(4)
                .withMessage('value is not uuidv4'),
            body('price')
                .notEmpty()
                .withMessage('price not empty')
                .isDecimal()
                .withMessage('price not decimal')
        ];
    }
}

export default new BookItemValidator();
