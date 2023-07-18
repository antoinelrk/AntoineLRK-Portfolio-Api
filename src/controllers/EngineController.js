import { env } from '../app.js'

export const sendHook = async (request, response) => {
    // envoyer un webhook sur Discord
    const payload = {
        embeds: [{
            title: `Vous avez un nouveau message provenant de ${request.body.pseudo}`,
            description: `${request.body.content}`,
            color: 16711680,
      }]
    };

    const status = await fetch(`${env.DISCORD_WEBHOOK_URL}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(response => {
        return response.status
    })

    response.status(status)
    response.json(`Webhook envoyé`)
}