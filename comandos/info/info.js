const Discord = require("discord.js")
const db = require('quick.db')

module.exports = {
  name: "info",
  aliases: ["infocmd"],
  description: "Mostra as informações de todos os comandos",
  usage: "info (comando)",
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)

    const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';

    const name = args[0];
    if (!name) return message.channel.send("Você deve enviar um comando")

    const comando = client.commands.get(name) || client.commands.find((cmd) => cmd.aliases.includes(name))

    if (!comando) return message.channel.send("**Não encontrei este comando!**")

    const embed = new Discord.MessageEmbed()
      .setAuthor(`Informações do comando ${name}`, client.user.displayAvatarURL())
      .addFields(
        {
          name: `Nome do comando`,
          value: `\`${name}\``,
        }
      )
      .addFields(
        {
          name: "Aliases",
          value: `\`${comando.aliases.join(", ") || "Nenhum"}\``,
        }
      )
      .addFields(
        {
          name: "Descrição",
          value: `\`${comando.description || "Nenhum"}\``,
        }
      )
      .addFields(
        {
          name: "Modo de usar",
          value: `\`${prefix}${comando.usage || "Nenhum"}\``,
        }
      )

      .setColor("#ff0000")
      .setThumbnail(message.guild.iconURL())
    message.channel.send(embed)

  }
}