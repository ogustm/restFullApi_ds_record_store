const {
    body,
    validationResult
} = require('express-validator');

const userValidationRules = () => {
    return [
        body('email')
        .isEmail()
        .normalizeEmail()
        .exists()
        .withMessage('Do you call this an email?'),
        body('password')
        .isLength({
            min: 10
        }).withMessage('Your password should be 10characters long.'),
        body('firstName').trim(),
        body('lastName').trim()
    ];
};

const userValidationErrorHandling = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    res.status(422).json({
        errors: errors.array()
    });

}

module.exports = {
    userValidationRules,
    userValidationErrorHandling
};