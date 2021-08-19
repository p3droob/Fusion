const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")

module.exports = {
  name: "removewarn",
  aliases: ["removewarns", "unwarn", "unwarns", "rwarns"],
  description: "Serve para retirar as warns de usuario",
  usage: "unwarn (@user) (quantia)",
  category: 'mod',
  run: async (client, message, args) => {
if (!message.member.hasPermission("KICK_MEMBERS")) return message.respond("** Você precisa ter permissão de `Expulsar Membros` para executar este comando**").then(m => m.delete({ timeout: 60000 }))


let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
let quantia = args[0]
let author = message.author;


        if (!member) return error.noUser(message)
        if (member.id === author.id) return error.autoPunish(message)
        if (message.member.roles.highest.position <= member.roles.highest.position) return error.userPosition(message)
        if (message.guild.me.roles.highest.position <= role.position) return error.clientPosition(message)
        if(isNaN(quantia)) return error.isNaN(message)

 await db.remove(`warnsCount_${message.guild.id}-${member.id}`, args[0])      

 const embed = new MessageEmbed()
            .setAuthor(`Sistema De Punições - ${client.user.username} - RemoveWarn`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido ID", `\`${member.id}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Author ID", `\`${author.id}\``)
            .addField("Quantia", `\`${quantia}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        message.respond(embed)

        let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
        if(!channel) {
          return;
        } else {
          const modL = new MessageEmbed()
            .setAuthor(`Sistema De Punições - Mod Log - ${client.user.username} - Ban`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Quantia", `\`${quantia}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        channel.send(modL)
        }

  }
}