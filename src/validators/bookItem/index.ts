import { body } from 'express-validator';
import { bookItemExists, libraryExists } from '../customValidators';

class BookItemValidator {
  checkCreateBookItem() {
    return [
      body('barcode')
        .custom(bookItemExists)
        .bail()
        .optional() // prod => notempty)
        .isUUID(4)
        .withMessage('value is not uuidv4'),
      body('libraryId')
        .custom(libraryExists)
        .bail()
        .notEmpty()
        .withMessage('libraryId not empty')
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
