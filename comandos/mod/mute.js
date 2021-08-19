const { MessageEmbed } = require("discord.js")
const error = require("../../utils/errors.js")
const ms = require("ms")
const db = require("quick.db")

module.exports = {
    name: "mute",
    aliases: ["silenciar", "mutar"],
    description: "Silencia um usuarios dos chats do servidor",
    usage: "mute (@user) (tempo) <motivo>",
  category: 'mod',
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.respond("** Você precisa ter permissão de `Gerenciar Cargos` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.respond("** Eu preciso da permissão de `Gerenciar Cargos` para executar este comando**").then(m => m.delete({ timeout: 60000 }))

        let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        let author = message.author;
        let motivo = args.slice(2).join(" ")
        let tempo = args[1]
        let role = message.guild.roles.cache.find(ch => ch.name === "⭐| Fusion Silenciado 🔇")

        if (!role) {
            message.guild.roles.create({ data: { name: "⭐| Fusion Silenciado 🔇", permissions: [] } })
            return error.muteRole(message)
        }
        await message.guild.channels.cache.filter(c => c.type === "text").forEach(async (channel, id) => {
            channel.createOverwrite(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONs: false
            })
        })
        if (!member) return error.noUser(message)
        if (member.id === author.id) return error.autoPunish(message)
        if (!tempo) return error.noTemp(message)
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return error.clientPosition(message)
        if (message.member.roles.highest.position <= member.roles.highest.position) return error.userPosition(message)
        if (message.guild.me.roles.highest.position <= role.position) return error.clientPosition(message)
        if (motivo.length > 1000) return error.lengthText(message)



        member.roles.add(role)
        const embed = new MessageEmbed()
            .setAuthor(`Sistema De Punições - ${client.user.username} - Mute`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido ID", `\`${member.id}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Author ID", `\`${author.id}\``)
            .addField("Tempo", `\`${tempo}\``)
            .addField("Motivo", `\`${motivo || "Não Especificou"}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        message.respond(embed)

        setTimeout(function () {
            member.roles.remove(role)
            const embed1 = new MessageEmbed()
                .setAuthor(`Sistema de Punições - ${client.user.username} - Unmute`, client.user.displayAvatarURL())
                .setColor("#FF0000")
                .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
                .addField("Punido", `\`${member.user.tag}\``)
                .addField("Punido ID", `\`${member.id}\``)
                .addField("Punido Por", `\`${client.user.tag}\``)
                .addField("Author ID", `\`${client.user.id}\``)
                .addField("Motivo", "`Tempo de Mute Esgotado`")
                .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
                .setThumbnail(member.user.displayAvatarURL())
            message.respond(embed1)
        }, ms(tempo))

        let channel = message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
        if(!channel) {
          return;
        } else {
          const modL = new MessageEmbed()
            .setAuthor(`Sistema De Punições - Mod Log - ${client.user.username} - Mute`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Tempo", `\`${tempo}\``)
            .addField("Motivo", `\`${motivo || "Não Especificou"}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        channel.send(modL)
        }

    }
}