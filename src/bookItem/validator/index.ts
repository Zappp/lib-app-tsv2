import { body, query, param, check } from 'express-validator';

class BookItemValidator {
  checkCreateBookItem() {
    return [
      body('isbn')
        .optional() //prod => notempty
        .isUUID(4)
        .withMessage('value not uuid v4'),
      body('title')
        .notEmpty()
        .withMessage('empty title')
        .isString()
        .withMessage('value not string'),
      body('price')
        .notEmpty()
        .withMessage('empty price')
        .isInt()
        .withMessage('value not a number'),
      body('authors') // prod => removed (handle case BookItem with no author)
        .notEmpty()
        .withMessage(''),
      check('authors.*.id')
        .optional() // => prod notempty
        .isUUID(4)
        .withMessage('value not uuid v4'),
      check('authors.*.name')
        .notEmpty()
        .withMessage('autor name empty')
        .isString()
        .withMessage('value not string')
    ];
  }
}
export default new BookItemValidator();
