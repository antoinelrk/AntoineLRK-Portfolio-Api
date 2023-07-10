import { Schema } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

let Model

const _init = (db) => {
    const schema = new Schema({
        email: { type: String },
        password: { type: String },
        created_at: { type: String },
        last_logged_at: { type: String }
    })

    schema.index({
        email: { unique: true }
    })

    schema.plugin(mongooseUniqueValidator)
    Model = db.model(`${import.meta.url.split(`/`).pop().split(`.`).shift()}`, schema)
}

export const getModel = () => Model

export default { _init }