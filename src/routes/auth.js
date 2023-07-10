import { register, login } from '../controllers/AuthController.js'
import { body } from 'express-validator'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { env } from '../app.js'

export default function (router) {
    const prefix = import.meta.url.split(`/`).pop().split(`.`).shift()

    router.post(`/${prefix}/register`, [
        env.APP_ENV === 'production' ? (request, response, next) => AuthMiddleware(request, response, next) : []
    ],
    [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isStrongPassword()
    ], (request, response) => register(request, response))

    router.post(`/${prefix}/login`, [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isStrongPassword()
    ], (request, password) => login(request, password))

    return router
}