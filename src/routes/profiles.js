import { get, create, update, destroy } from '../controllers/ProfileController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { body, param } from 'express-validator'

export default function (router) {
    const prefix = `/${import.meta.url.split(`/`).pop().split(`.`).shift()}`

    router.get(`${prefix}`, (request, response) => get(request, response))
    router.get(`${prefix}/:id`, (request, response) => get(request, response))

    router.post(`${prefix}`, [(request, response, next) => AuthMiddleware(request, response, next)], [
        body('name').notEmpty().isString(),
        body('biography').notEmpty().isString(),
        body('jobTitle').notEmpty().isString(),
        body('avatar_url').isString(),
        body('cv_uri').isString(),
        body('cv_url').isString(),
    ], (request, response) => create(request, response))

    router.patch(`${prefix}/:id`, [(request, response, next) => AuthMiddleware(request, response, next)], [
        param('id').notEmpty(),
        body('name').isString(),
        body('biography').isString(),
        body('jobTitle').isString(),
        body('avatar_url').isString(),
        body('cv_uri').isString(),
        body('cv_url').isString(),
    ], (request, response) => update(request, response))

    router.delete(`${prefix}/:id`,
    [(request, response, next) => AuthMiddleware(request, response, next)],
    [param('id').notEmpty()],
    (request, response) => destroy(request, response))

    return router
}