import { get, create, update, destroy } from '../controllers/SocialNetworkController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { body, param } from 'express-validator'

export default function (router) {
    const prefix = `/${import.meta.url.split(`/`).pop().split(`.`).shift()}`

    router.get(`${prefix}`, (request, response) => get(request, response))
    router.get(`${prefix}/:id`, (request, response) => get(request, response))

    router.post(`${prefix}`, [(request, response, next) => AuthMiddleware(request, response, next)], [
        body('name').notEmpty().isString(),
        body('url').notEmpty().isString(),
        body('icon').notEmpty().isString()
    ], (request, response) => create(request, response))

    router.patch(`${prefix}/:id`, [(request, response, next) => AuthMiddleware(request, response, next)], [
        param('id').notEmpty(),
        body('name').isString(),
        body('url').isString(),
        body('icon').isString()
    ], (request, response) => update(request, response))

    router.delete(`${prefix}/:id`,
    [(request, response, next) => AuthMiddleware(request, response, next)],
    [param('id').notEmpty()],
    (request, response) => destroy(request, response))

    return router
}