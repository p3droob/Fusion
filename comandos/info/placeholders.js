const Discord = require("discord.js")

module.exports = {
  name: "placeholders",
  aliases: ["variaveis", "configmessages"],
  usage: "placeholders",
  description: "Mostra todas as variaveis para se usar nos set messages",
  category: 'info',
  run: async (client, message, args) => {

const place = new Discord.MessageEmbed()
.setAuthor(`Place Holders/Variaveis`, message.guild.iconURL())
.addField("Entrada/Saida", "> **{guild:name} - Mostra o nome do servidor**\n> **{member:mention} - Menciona o user**\n> **{member:username} - Mostra o username do User**\n> **{member:count} - Mostra o total de Users na guld**\n> **{member:id} - Mostra o ID do user**")
.addField("Level Up", "> **{member:mention} - Menciona o User**\n> **{member:username} - Mostra o username do user**\n> **{member:level} - Mostra o Level do user**\n> **{member:xp} - Mostra o xp do user**")
.setColor("RED")
.setTimestamp()
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
message.respond(place)

  }
}