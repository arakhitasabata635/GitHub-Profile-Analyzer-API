const { param, validationResult } = require("express-validator");

const usernameValidation = [
  param("username")
    .trim()
    .notEmpty()
    .withMessage("GitHub username is required")
    .isLength({
      min: 1,
      max: 39,
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = usernameValidation;
