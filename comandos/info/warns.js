const Discord = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")
const quote = require("../../utils/quote.js")

module.exports = {
  name: "warns",
  aliases: ["avisos"],
  description: "Mostra os warns do usuario",
  usage: "warns",
  run: async (client, message, args) => {
    if(!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return error.permissionFor(message)

    let user = message.mentions.users.first() || await client.users.cache.get(args[0]) || message.author;
 let warns = db.get(`warnsCount_${message.author.id}-${user.id}`) || 0 


const embed = new Discord.MessageEmbed()
.setAuthor(`Warns ${message.author.username}`, client.user.displayAvatarURL())
.setDescription(`**${emoji.aviso} ${user} possui ${warns} Warns neste servidor**`)
.setColor("#FF0000")
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
.setThumbnail(user.displayAvatarURL())
message.quote(embed)

  }
}