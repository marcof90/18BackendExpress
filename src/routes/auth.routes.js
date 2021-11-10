const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { check } = require('express-validator')

/**
 * @api {get} /profile Perfil del usuario
 * @apiName Perfil 
 * @apiDescription Perfil del usuario logueado
 * @apiGroup Data
 */
router.get('/profile', authController.profile)


/**
 * @api {post} /register Registro de usuarios
 * @apiName Registro
 * @apiGroup AUTH
 * @apiDescription registro de usuarios usando los campos nombre, email, password 
 * @apiParam {string} name Nombre del usuario que se registra
 * @apiParam {string} email E-mail del usuario que se registra
 * @apiParam {string} password Contraseña del usuario
 * @apiParamExample {json} Request-Example:
 *          {
 *              "name": "Pepito Perez",
 *              "email": "pepitoperez@email.com",
 *              "password": "contraseña123"
 *          }
 * @apiPermission none
 * @apiSuccess {json} token Token de acceso del usuario
 * @apiSuccessExample {json} Success-Response
 *  HTTP/1.1 200 ok
 *  {
 *       "token": {
 *           "userData": {
 *               "name": "Pepito Perez",
 *               "email": "pepitoperez@email.com",
 *               "password": "$2b$10$323qwuIJMh6w1zkU8aOzfOWQ.8Y95Qw6c27xX3Jy2psb9zwYS/Fym",
 *               "_id": "6179becd9d68f8b618716a00",
 *               "__v": 0
 *           },
 *           "code": 200,
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc5YmVjZDlkNjhmOGI2MTg3MTZhMDAiLCJpYXQiOjE2MzUzNjg2NTMsImV4cCI6MTY2NjkwNDY1M30.-abuDK-8yqHXzTK7NHjyUYyA0TqD3BM5crrEnTwf8Gs"
 *       }
 *   }
 * @apiError (200) Error El email debe ser unico
 * @apiErrorExample {json} Error-Response
 *  HTTP/1.1 200 ok
 *  {
 *       "token": {
 *           "index": 0,
 *           "code": 11000,
 *           "keyPattern": {
 *               "email": 1
 *           },
 *           "keyValue": {
 *               "email": "email@email.com"
 *           }
 *       }
 *   }
 * @apiError (200) Error El email es requerido
 * @apiErrorExample {json} Error-Response-Example
 *  HTTP/1.1 200 ok 
 *  {
 *       "token": {
 *           "errors": {
 *               "email": {
 *                   "name": "ValidatorError",
 *                   "message": "Path `email` is required.",
 *                   "properties": {
 *                       "message": "Path `email` is required.",
 *                       "type": "required",
 *                       "path": "email"
 *                   },
 *                   "kind": "required",
 *                   "path": "email"
 *               }
 *           },
 *           "_message": "user validation failed",
 *           "name": "ValidationError",
 *           "message": "user validation failed: email: Path `email` is required."
 *       }
 *   }
 * @apiError (422) (Data Error) error en la validación de los datos
 * @apiErrorExample {json} Data-Error-Example
 * HTTP/1.1 422 unprocessable entry
 *  {
 *       "errors": [
 *           {
 *               "value": "m",
 *               "msg": "Nombre no valido, minimo 2 caracteres, maximo 40 caracteres",
 *               "param": "name",
 *               "location": "body"
 *           },
 *           {
 *               "value": "ema",
 *               "msg": "Email no valido",
 *               "param": "email",
 *               "location": "body"
 *           },
 *           {
 *               "value": "df",
 *               "msg": "Contraseña debil",
 *               "param": "password",
 *               "location": "body"
 *           }
 *       ]
 *   }
 */
router.post('/register',[
        check('name', 'Nombre no valido, minimo 2 caracteres, maximo 40 caracteres').isLength({min: 2, max: 40}),
        check('email', 'Email no valido').isEmail(),
        check('password', 'Contraseña debil').isStrongPassword()
    ],
    authController.register
)


/**
 * @api {post} /login Ingreso de usuarios
 * @apiName Login
 * @apiGroup AUTH
 * @apiDescription ingreso de usuarios a la plataforma usando email y password 
 * @apiParam {string} email E-mail del usuario que ingrea
 * @apiParam {string} password Contraseña del usuario
 * @apiSampleRequest https://mintic-18.herokuapp.com/auth/login
 */
router.post('/login', authController.login)

module.exports = router
