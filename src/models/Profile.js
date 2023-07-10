import { Schema } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

let Model

const _init = (db) => {
    const schema = new Schema({
        name: { type: String },
        biography: { type: String },
        job_title: { type: String },
        cv_uri: { type: String },
        avatar_url: { type: String },
        cv_url: { type: String },
        is_active: { type: Boolean }
    })
    schema.plugin(mongooseUniqueValidator)
    Model = db.model(`${import.meta.url.split(`/`).pop().split(`.`).shift()}`, schema)
}

export const getModel = () => Model

export default { _init }