const Discord = require('discord.js')
const quote = require("../../utils/quote.js")

module.exports = {
  name: 'invite',
  aliases: ["invite", "convidar"],
  description: 'me convide',
  usage: 'invite',
  run: async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setTitle(`Obrigado por me adicionar`)
.setColor('#ff0000')
.setDescription(`${message.author} você pode me adicionar [clicando aqui!](https://discord.com/oauth2/authorize?client_id=812272055457546271&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D812272055457546271%26permissions%3D8%26redirect_uri%3Dhttps%253A%252F%252Fdiscord.com%252Fapi%252Foauth2%252Fauthorize%253Fclient_id%253D812272&scope=bot)`)
.setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
message.quote(embed)
  }
}