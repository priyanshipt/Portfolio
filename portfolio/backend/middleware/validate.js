import { body, validationResult } from 'express-validator';

// Length is checked before escape() because escaping can lengthen a string.
export const contactRules = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Enter your name (2 to 80 characters).').bail().escape(),
  body('email').trim().isEmail().withMessage('Enter a valid email address.').bail().isLength({ max: 120 }).withMessage('Email is too long.').bail().normalizeEmail({ gmail_remove_dots: false }),
  body('subject').optional({ values: 'falsy' }).trim().isLength({ max: 120 }).withMessage('Keep the subject under 120 characters.').bail().escape(),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Write a message between 10 and 2000 characters.').bail().escape(),
];

export function handleValidation(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  return res.status(422).json({
    message: 'Please fix the highlighted fields.',
    errors: result.array().map((e) => ({ field: e.path, message: e.msg })),
  });
}
