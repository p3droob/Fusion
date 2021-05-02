const error = require("../../utils/errors.js")
const quote = require("../../utils/quote.js")
const emoji = require("../../utils/emojis.js")
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "say",
    aliases: ["falar"],
    description: "O client fala por você",
    usage: "<prefix>say (mensage)",
    run: async (client, message, args) => {
       if(!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
if(!message.member.hasPermission("MANAGE_GUILD")) return message.quote(`**${emoji.errado} Você precisa da permissão de \`Gerenciar Servidor\` para executar este comando**`)

let say = args.join(" ")
let author = message.author;


if(!say) return error.noContent(message)
if (say.length > 1000) return error.lengthText(message)


message.quote(`${say.replace("@everyone", `@ everyone`).replace("@here", "@ here").replace("https://", "KKKKK").replace("discord.gg/", "KKKKK")}\n\nAutor: ${author}`)


let channel = client.channels.cache.get("828240877989920838")
const embed = new MessageEmbed()
.setTitle("Say")
.addField("Autor", `${message.author.tag}`)
.addField("ID", `${author.id}`)
.addField("Server", `${message.guild.name}`)
.addField("Mensagem", `${say}`)
channel.send(embed)
    }
}