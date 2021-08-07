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
      body('completed')
        .optional()
        .isBoolean()
        .withMessage('value should be boolean')
        .isIn([0, false])
        .withMessage('value should be 0 or false'),
    ];
  }
  checkReadBook() {
    return [
      query('limit')
        .notEmpty()
        .withMessage('limit should be not empty')
        .isInt({ min: 1, max: 5 })
        .withMessage('limit value should be <1, 5>)'),
      query('offset')
        .optional()
        .isNumeric()
        .withMessage('the value should be a number')
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
}
export default new BookValidator();
