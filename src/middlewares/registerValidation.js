const {body} = require ("express-validator");

module.exports = [

    body("nombre").notEmpty().withMessage("indicar un nombre de Usurario - BACK").isLength({min:3}).withMessage("debe completar con minimo de 3 letras- BACK"),
    body("apellido").notEmpty().withMessage("indicar un apellido de Usurario- BACK").isLength({min:3}).withMessage("debe completar con minimo de 3 letras- BACK"),
    body('email').notEmpty().withMessage('Indicar un email válido- BACK').isEmail().withMessage('Ingrese un email válido- BACK'),
    body("contrasenia").notEmpty().withMessage("indicar una contraseña de Usuario- BACK")
    .isStrongPassword({minLength:3,minUppercase:1,minNumbers:1, minSymbols:0}).withMessage("debe indicar 3 letras, 1 mayuscula y 1 numero- BACK"),


];