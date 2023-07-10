import jwt from 'jsonwebtoken'
import { env } from '../app.js' 

export const generateJwt = (user, options = null) => {
    const token = jwt.sign(user, env.JWT_SECRET, {
        expiresIn: `${env.JWT_REFRESH_TTL}m`
    })

    if (options?.withRefresh) {
        const refreshToken = jwt.sign(user, env.JWT_SECRET, {
            expiresIn: `${env.JWT_REFRESH_TTL}m`
        })
        return {
            token: token,
            refresh: refreshToken
        }
    } else {
        return {
            token: token
        }
    }
}

export const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET)
        return decoded
    } catch (error) {
        return null
    }
}