import { body, query, param } from 'express-validator';

class AuthorValidator {
  checkCreateAuthor() {
    return [
      body('id')
        .optional()
        .isUUID(4)
        .withMessage('value not uuid v4'),
      body('title')
        .notEmpty()
        .withMessage('empty title'),
    ];
  }
  checkReadAuthor() {
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
  checkUpdateAuthor() {
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
export default new AuthorValidator();