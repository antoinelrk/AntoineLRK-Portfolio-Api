import { get, create, update, destroy } from '../controllers/EducationController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { body, param } from 'express-validator'

export default function (router) {
    const prefix = `/${import.meta.url.split(`/`).pop().split(`.`).shift()}`

    router.get(`${prefix}`, (request, response) => get(request, response))
    router.get(`${prefix}/:id`, (request, response) => get(request, response))

    router.post(`${prefix}`, [(request, response, next) => AuthMiddleware(request, response, next)], [
        body('title').notEmpty().isString(),
        body('start_at').notEmpty().isString(),
        body('company_name').notEmpty().isString(),
        body('company_url').notEmpty().isString(),
        body('company_brand').notEmpty().isString(),
        body('description').notEmpty().isString()
    ], (request, response) => create(request, response))

    router.patch(`${prefix}/:id`, [(request, response, next) => AuthMiddleware(request, response, next)], [
        param('id').notEmpty(),
        body('title').isString(),
        body('start_at').notEmpty().isString(),
        body('company_name').isString(),
        body('company_url').isString(),
        body('company_brand').isString(),
        body('description').isString()
    ], (request, response) => update(request, response))

    router.delete(`${prefix}/:id`,
    [(request, response, next) => AuthMiddleware(request, response, next)],
    [param('id').notEmpty()],
    (request, response) => destroy(request, response))

    return router
}