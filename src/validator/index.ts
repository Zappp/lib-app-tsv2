import { body } from 'express-validator';

export const BookValidator = {
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
}
