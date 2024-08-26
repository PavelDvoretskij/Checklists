import { body } from "express-validator";

export default [
  body("name")
    .notEmpty()
    .withMessage("Имя не должно быть пустым")
    .isString()
    .withMessage("Имя  должно быть строкой"),
  body("email")
    .notEmpty()
    .withMessage("Email не должен быть пустым")
    .isEmail()
    .withMessage("Укажите правильный Email адрес"),
  body("password")
    .isLength({ min: 5, max: 16 })
    .withMessage("Пароль должен содержать минимум 5 символов, до 16")
    .matches(/\d/)
    .withMessage("Пароль должен содержать хотя бы одну цифру"),
];
