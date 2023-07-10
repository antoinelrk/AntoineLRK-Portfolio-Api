import { get, create, update, destroy } from '../controllers/ProjectController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { body, param } from 'express-validator'

export default function (router) {
    const prefix = `/${import.meta.url.split(`/`).pop().split(`.`).shift()}`

    router.get(`${prefix}/:id`, [], (request, response) => get(request, response))
    router.get(`${prefix}`, [], (request, response) => get(request, response))

    router.post(`${prefix}`, [
        (request, response, next) => AuthMiddleware(request, response, next)
    ], [
        body('title').notEmpty().isString(),
        body('tags').notEmpty().isString(),
        body('description').notEmpty().isString(),
        body('banner_url').notEmpty().isString(),
        body('demo_url').isString(),
        body('repo_url').isString()
    ], (request, response) => create(request, response))

    router.patch(`${prefix}/:id`, [(request, response, next) => AuthMiddleware(request, response, next)],
    [
        param('id').notEmpty(),
        body('title').isString(),
        body('tags').isString(),
        body('description').isString(),
        body('banner_url').isString(),
        body('demo_url').isString(),
        body('repo_url').isString()
    ], (request, response) => update(request, response))

    router.delete(`${prefix}/:id`,
    [(request, response, next) => AuthMiddleware(request, response, next)],
    [param('id').notEmpty()],
    (request, response) => destroy(request, response))

    return router
}