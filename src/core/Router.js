import express from 'express'
import { query, body, param } from 'express-validator'
import fs from 'fs'

export default function () {
    const routesFiles = fs.readdirSync(`${process.cwd()}/src/routes`)
    let router = express.Router()

    routesFiles.map(async (file) => {
        if (file.endsWith(`.js`)) {
            router = await import(`../routes/${file}`).then(module => module.default(router))
        }
    })

    return router
}