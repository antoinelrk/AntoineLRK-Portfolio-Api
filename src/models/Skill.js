import { Schema } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

let Model

const _init = (db) => {
    const schema = new Schema({
        name: { type: String },
        fill: { type: String },
        grade: { type: Number },
        icon: { type: String }
    })

    schema.index({ name: { unique: true }})
    schema.plugin(mongooseUniqueValidator)
    Model = db.model(`${import.meta.url.split(`/`).pop().split(`.`).shift()}`, schema)
}

export const getModel = () => Model

export default {
    _init
}