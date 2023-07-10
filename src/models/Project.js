import { Schema } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

let Model

const _init = (db) => {
    const schema = new Schema({
        title: { type: String },
        tags: [
            { type: String }],
        description: { type: String },
        banner_url: { type: String },
        demo_url: { type: String },
        repo_url : { type: String }
    })
    schema.index({ tags: [{ unique: true }] })
    schema.plugin(mongooseUniqueValidator)
    Model = db.model(`${import.meta.url.split(`/`).pop().split(`.`).shift()}`, schema)
}

export const getModel = () => Model

export default { _init }