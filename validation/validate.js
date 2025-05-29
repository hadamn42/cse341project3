const { body, validationResult } = require('express-validator');

const breedRules = () => {
    return [
        body('breed').isString().notEmpty(),
        body('breedType').isString().notEmpty(),
        body('origin').isString().notEmpty(),
        body('popularity').isInt().notEmpty(),
        body('temperament').isArray().notEmpty(),
        body('hypoallergenic').isString().notEmpty(),
        body('intelligence').isInt().notEmpty(),
        body('photo').isString().notEmpty()
    ];
};

const catRules = () => {
    return [
        body('Breed').isString().notEmpty(),
        body('Age').isInt().notEmpty(),
        body('Weight').isInt().notEmpty(),
        body('Color').isString().notEmpty(),
        body('Gender').isString().notEmpty()
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    };
    const extracctedErrors = [];
    errors.array().map(err => extracctedErrors.push({ [err.path]: err.msg}));

    return res.status(422).json({
        errors: extracctedErrors,
    });
};

module.exports = {
    breedRules,
    catRules,
    validate
};