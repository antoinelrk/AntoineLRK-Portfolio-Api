import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { body, param } from 'express-validator'

export default function (router) {
    const prefix = `/${import.meta.url.split(`/`).pop().split(`.`).shift()}`

    router.get(`${prefix}`)

    return router
}