import { body, query, param, check } from 'express-validator';

class BookValidator {
  checkCreateBook() {
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
      body('authors') // prod => removed (handle case book with no author)
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
