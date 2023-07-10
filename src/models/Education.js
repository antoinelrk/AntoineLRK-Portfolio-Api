import { Schema } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

let Model

const _init = (db) => {
    const schema = new Schema({
        title: { type: String },
        start_at: { type: String },
        ended_at: { type: String },
        company_name: { type: String },
        company_brand: { type: String },
        company_url: { type: String },
        certification_url: { type: String },
        description: { type: String }
    })
    schema.plugin(mongooseUniqueValidator)
    Model = db.model(`${import.meta.url.split(`/`).pop().split(`.`).shift()}`, schema)
}

export const getModel = () => Model

export default { _init }