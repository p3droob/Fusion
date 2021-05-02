const { MessageEmbed } = require("discord.js")
const error = require("../../utils/errors.js")
const quote = require("../../utils/quote.js")
const db = require("quick.db")

module.exports = {
    name: "unmute",
    aliases: ["desmutar"],
    description: "Desilencia um usario mutado",
    usage: "<prefix>unmute (@user)",
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.quote("**<:errado:824911072384647178> Você precisa ter permissão de `Gerenciar Cargos` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.quote("**<:errado:824911072384647178> Eu preciso da permissão de `Gerenciar Cargos` para executar este comando**").then(m => m.delete({ timeout: 60000 }))


        let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        let author = message.author;
        let role = message.guild.roles.cache.find(ch => ch.name === "⭐| Sality™ mute 🔇")

        if (!member) return error.noUser(message)
        if (member.roles.cache.has(role.id)) return error.tryMute(messae)
        if (message.guild.me.roles.highest.position <= role.position) return error.clientPosition(message)
        if (message.member.roles.highest.position <= member.roles.highest.position) return error.userPosition(message)
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return error.clientPosition(message)
        if (member.id === author.id) return error.autoPunish(message)

        member.roles.remove(role)
        const embed = new MessageEmbed()
            .setAuthor(`Sistema De Punições - ${client.user.username} - Unmute`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido ID", `\`${member.id}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Author ID", `\`${author.id}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        message.quote(embed)

        let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
        if(!channel) {
          return;
        } else {
          const modL = new MessageEmbed()
            .setAuthor(`Sistema De Punições - Mod Log - ${client.user.username} - Ban`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        channel.send(modL)
        }

    }
}