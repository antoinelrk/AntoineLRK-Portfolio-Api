import { Schema } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

let Model

const _init = (db) => {
    const schema = new Schema({
        name: { type: String },
        url: { type: String },
        icon: { type: String }
    })
    schema.index({ url: { unique: true } })
    schema.plugin(mongooseUniqueValidator)
    Model = db.model(`${import.meta.url.split(`/`).pop().split(`.`).shift()}`, schema)
}

export const getModel = () => Model

export default { _init }