const Discord = require("discord.js");
const moment = require("moment")
const quote = require("../../utils/quote.js")
const error = require("../../utils/errors.js")

module.exports = {
  name: "voiceinfo",
  aliases: ["vinfo"],
  usage: "<prefix>voiceinfo",
  description: "Mostra as informações do canal de voz que o bot está",
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)

    if (!message.guild.me.voice.channel)
      return error.noVcm(message)

    const vcInfo = new Discord.MessageEmbed()
      .setTitle("Voice Info")
      .addField("Nome", message.guild.me.voice.channel.name)
      .addField("ID", message.guild.me.voice.channel.id)
      .addField("Limite", message.guild.me.voice.channel.userLimit)
      .addField("Criado dia", moment().format("DD/MM/YYYY, HH:mm:ss", message.guild.me.voice.channel.createdAt))
      .setColor("BLUE")
      .setFooter(`Requisitado por ${message.member.displayName}`)
      .setTimestamp();

    message.quote(vcInfo).catch(e => console.log(e.stack)).then(message.member.voice.channel.leave());

  }
}

