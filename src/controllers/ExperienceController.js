import { getModel } from '../models/Experience.js'

export const get = async (request, response) => {
    let data

    if (request.params.id) {
        data = await getModel().findOne({ _id: request.params.id })
    } else {
        data = await getModel().find({})
    }

    response.status(200)
    response.json(data)
}

export const create = async (request, response) => {
    const newExperience = new (getModel())(request.body)
    await newExperience.save()
    response.status(201)
    response.json(newExperience)
}

export const update = async (request, response) => {
    const updatedExperience = await getModel().findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
    response.status(200)
    response.json(updatedExperience)
}

export const destroy = async (request, response) => {
    await getModel().deleteOne({ _id: request.params.id })
    response.status(200)
    response.json(`La ressources à bien été supprimé`)
}
