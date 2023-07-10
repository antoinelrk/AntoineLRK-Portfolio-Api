import express from "express"
import Database from "./core/Database.js"
import Model from './core/Model.js'
import dotenv from 'dotenv'
import Security from './middlewares/SecurityMiddleware.js'
import Router from './core/Router.js'
import cors from 'cors'

dotenv.config()
export const env = process.env

const webServer = express()
webServer.use(express.json())
webServer.use('/static', express.static(`${process.cwd()}/storage`));
webServer.use(Security)

webServer.use(cors({
    origin: env.CORS_URLS.split(','),
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    optionsSuccessStatus: 200
}))

/**
 * On créé l'instance de la database
 */
const db = Database.connect({
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    dbName: env.DB_NAME
})

/**
 * On initialize l'application ici
 */
Model._init(db)
let router = Router()
webServer.use(router)
webServer.listen(env.APP_PORT, async () => console.log(`API listening on port ${env.APP_PORT}`))

//? Getters & Setters
const getDatabase = () => db

export default {
    getDatabase
}