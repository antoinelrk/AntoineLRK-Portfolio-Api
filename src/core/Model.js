import fs from 'fs'

const _init = (db) => {
    const modelsFiles = fs.readdirSync(`${process.cwd()}/src/models`)

    modelsFiles.map(async (file) => {
        if (file.endsWith(`.js`)) {
            await import(`../models/${file}`).then(module => module.default._init(db))
        }
    })
}

export default {
    _init
}