import { body, query, param } from 'express-validator';

class BookValidator {
  checkCreateBook() {
    return [
      body('id')
        .optional()
        .isUUID(4)
        .withMessage('value should be uuid v4'),
      body('title')
        .notEmpty()
        .withMessage('error: empty title'),
    ];
  }
  checkReadBook() {
    return [
      query('limit')
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage('limit value should be <1, 5>')
    ];
  }
  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('param should be not empty')
        .isUUID(4)
        .withMessage('value should be uuid v4')
    ];
  }
  checkTitle() {
    return [
      param('id')
        .notEmpty()
        .withMessage('param should be not empty')
        .isUUID(4)
        .withMessage('value should be uuid v4'),
      body('title')
        .notEmpty()
        .withMessage('error')
    ];
  }
}
export default new BookValidator();
