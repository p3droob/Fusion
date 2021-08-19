const Discord = require("discord.js");
const error = require("../../utils/errors.js")

module.exports = {
  name: "icon",
  aliases: ["servericon"],
  usage: "icon",
  description: "Mostra o icone do servidor",
  category: 'info',
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)

    let icon = message.guild.iconURL({ format: "png", size: 2048 })

    const icone = new Discord.MessageEmbed()
      .setDescription(` **Ícone de ${message.guild.name} [Clique Aqui](${icon}) para baixar foto**`)
      .setImage(icon)
      .setColor("#ff0000")
      .setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
    message.respond(icone)
  }
}