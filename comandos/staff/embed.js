const error = require("../../utils/errors.js")
const quote = require("../../utils/quote.js")
const emoji = require("../../utils/emojis.js")
const db = require("quick.db")

module.exports = {
    name: "embed",
    aliases: ["falarembed"],
    description: "O client fala por você",
    usage: "<prefix>say (mensage)",
    run: async (client, message, args) => {
        if(!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
if(!message.member.hasPermission("MANAGE.GUILD")) return message.quote(`**${emoji.errado} Você precisa da permissão de \`Gerenciar Servidor\` para executar este comando**`)

let say = args.join(" ")
let author = message.author;


if(!say) return error.noContent(message)

message.quote({embed: {
description: `\`${say}\`\n\n${emoji.aviao}Autor do comando: ${author}`,
color: "#ff0000"
}})
    }
}