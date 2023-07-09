import {body,param ,validationResult} from "express-validator";

export const isValid = (req, res, next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next();
}



export const registrationValid = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "min 6 characters").trim().isLength({ min: 6 }),
    body("password", "format incorrect"),
    body("userName").trim().normalizeEmail().isString(),
    body("lastName").trim().normalizeEmail().isString(),
    body("userType").isString(),
    body("refid").isBoolean(),
    body("img").trim().isString(),
    isValid,
];

export const loginValidator = [
    body("email", "format incorrect")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "min 6 characters").trim().isLength({ min: 6 }),
    body("password", "format incorrect"),
    isValid,
];
