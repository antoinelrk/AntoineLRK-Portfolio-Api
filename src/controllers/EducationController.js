import { getModel } from '../models/Education.js'

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
    const newEducation = new (getModel())(request.body)
    await newEducation.save()
    response.status(201)
    response.json(newEducation)
}

export const update = async (request, response) => {
    const updatedEducation = await getModel().findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
    response.status(200)
    response.json(updatedEducation)
}

export const destroy = async (request, response) => {
    await getModel().deleteOne({ _id: request.params.id })
    response.status(200)
    response.json(`La ressources à bien été supprimé`)
}
