import { body, query, param, check } from 'express-validator';

class BookValidator {
  checkCreateBook() {
    return [
      body('book.id')
        .optional() //prod => notempty
        .isUUID(4)
        .withMessage('value not uuid v4'),
      body('book.title')
        .notEmpty()
        .withMessage('empty title'),
      body('authors') // prod => removed
        .notEmpty()
        .withMessage(''),
      check('authors.*.id')
        .optional() // => prod notempty
        .isUUID(4)
        .withMessage('value not uuid v4'),
      check('authors.*.name')
        .notEmpty()
        .withMessage('autor name empty'),
    ];
  }
  checkReadBook() {
    return [
      query('limit')
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage('limit not in <1, 5>')
    ];
  }
  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('param empty')
        .isUUID(4)
        .withMessage('value not uuid v4')
    ];
  }
  checkUpdateBook() {
    return [
      param('id')
        .notEmpty()
        .withMessage('param empty')
        .isUUID(4)
        .withMessage('value not uuid v4'),
      body('title')
        .notEmpty()
        .withMessage('empty title')
    ];
  }
}
export default new BookValidator();
