import { getModel } from '../models/Project.js'

export async function get (request, response) {
    let data

    if (request.params.id) {
        data = await getModel().findOne({ _id: request.params.id })
    } else {
        data = await getModel().find({})
    }

    response.status(200)
    response.json(data)
}

export async function create (request, response) {
    const newProject = new (getModel())(request.body)
    await newProject.save()
    response.status(201)
    response.json(newProject)
}

export async function update (request, response) {
    let project = await getModel().findOne({ _id: request.params.id })
    
    let payload
    if (request.body.tags) {
        payload = {
            ...request.body, ...{ tags: [...new Set([...project.tags, ...request.body?.tags])] }
        }
    }

    payload = request.body

    const updatedProject = await getModel().findOneAndUpdate({ _id: request.params.id }, payload, { new: true })

    if (project) {
        response.status(200)
        response.json(updatedProject)
    } else {
        response.status(422)
        response.json(`Le projet est introuvable`)
    }
}

export async function destroy (request, response) {
    await getModel().deleteOne({ _id: request.params.id })
    response.status(200)
    response.json(`La ressources à bien été supprimé`)
}