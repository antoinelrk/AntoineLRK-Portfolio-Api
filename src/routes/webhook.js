import { sendHook } from '../controllers/EngineController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

export default function (router) {
    router.post(`/discord/send-hook`,
        [(request, response, next) => AuthMiddleware(request, response, next)],
        (request, response) => sendHook(request, response)
    )

    return router
}