import { getModel } from '../models/User.js'
import { make, verify } from '../core/Hash.js'
import { generateJwt } from '../core/Jwt.js'
import { env } from '../app.js'

export const login = async (request, response) => {
    const user = await getModel().findOne({
        email: request.body.email
    })

    if (user) {
        if (await verify(user.password, request.body.password)) {
            const jwtData = generateJwt({
                id: user._id.toString(),
                email: user.email,
                created_at: user.created_at,
                last_logged_at: user.last_logged_at
            }, { withRefresh: true })

            response.cookie(`token`, jwtData.token, { maxAge: env.JWT_TTL })
            response.cookie(`refresh_token`, jwtData.token, { maxAge: env.JWT_REFRESH_TTL })
            response.status(200)
            response.json(`Successfully Logged`)
        }
    } else {
        response.status(403)
        response.json(`E-mail introuvable`)
    }
}

export const register = async (request, response) => {
    const payload = {...request.body, ...{
        password: await make(request.body.password),
        created_at: new Date().toLocaleString(),
        last_logged_at: new Date().toLocaleString()
    }}
    const newUser = new (getModel())(payload)
    try {
        newUser.save()
        response.status(201)
        response.json(`Successfully registered`)
    } catch (error) {
        response.status(500)
        response.json(`Internal Server Error`)
    }
}

export const destroy = async (request, response) => {}