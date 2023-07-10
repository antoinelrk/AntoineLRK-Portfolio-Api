import { Schema } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

let Model

const _init = (db) => {
    const schema = new Schema({
        about: { type: String }
    })
    schema.plugin(mongooseUniqueValidator)
    Model = db.model(`${import.meta.url.split(`/`).pop().split(`.`).shift()}`, schema)
}

export const getModel = () => Model

export default { _init }