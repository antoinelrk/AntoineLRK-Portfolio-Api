import { verifyJwt } from '../core/Jwt.js'

export default (request, response, next) => {
    if (request.headers.hasOwnProperty('authorization')) {
        if (request.headers.authorization.split(" ")[0] === "Bearer") {
            const decodedToken = verifyJwt(request.headers.authorization.split(" ")[1])
            if (decodedToken === null) {
                response.status(403)
                response.send({
                    message: `Le token est invalide`
                })
                return;
            }
            request.user = {...{
                id: decodedToken.id,
                email: decodedToken.email,
                created_at: decodedToken.created_at,
                last_logged_at: decodedToken.last_logged_at
            }}
    
            next()
        } else {
            response.status(403)
            response.send({
                message: `Le token est invalide`
            })
        }
    } else {
        response.status(403)
        response.send({
            message: `Le token est invalide`
        })
    }
}