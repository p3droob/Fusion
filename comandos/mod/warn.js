const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: "warn",
  aliases: ["avisar", "aviso"],
  description: "Serve pra avisar um usuario que quebrou as regras do servidor",
  usage: "warn (@user) <motivo>",
  category: 'mod',
  run: async (client, message, args) => {
if (!message.member.hasPermission("KICK_MEMBERS")) return message.respond("** Você precisa ter permissão de `Expulsar Membros` para executar este comando**").then(m => m.delete({ timeout: 60000 }))


let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
let motivo = args.slice(1).join(" ")
let author = message.author;

        if (!member) return error.noUser(message)
        if (member.id === author.id) return error.autoPunish(message)
        if (message.member.roles.highest.position <= member.roles.highest.position) return error.userPosition(message)
        if (motivo.length > 1000) return error.lengthText(message)

 await db.add(`warnsCount_${message.guild.id}-${member.id}`, 1)      

 const embed = new MessageEmbed()
            .setAuthor(`Sistema De Punições - ${client.user.username} - Warn`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido ID", `\`${member.id}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Author ID", `\`${author.id}\``)
            .addField("Motivo", `\`${motivo || "Não Especificou"}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        message.respond(embed)

        let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
        if(!channel) {
          return;
        } else {
          const modL = new MessageEmbed()
            .setAuthor(`Sistema De Punições - Mod Log - ${client.user.username} - Warn`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Motivo", `\`${motivo || "Não Especificou"}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        channel.send(modL)
        }

  }
}