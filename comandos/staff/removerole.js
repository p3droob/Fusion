const { MessageEmbed, Message } = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const quote = require("../../utils/quote.js")

module.exports = {
    name: "removerole",
    aliases: ["removerrole"],
    decription: "Comando usado para remover uma role ao user mencionado",
    usage: "<prefix>removerole (@user) (@role)",
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.quote("**<:errado:824911072384647178> Você precisa ter permissão de `Gerenciar Cargos` para executar este comando**").then(m => m.delete({ timeout: 60000 }))
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.quote("**<:errado:824911072384647178> Eu preciso da permissão de `Gerenciar Cargos` para executar este comando**").then(m => m.delete({ timeout: 60000 }))

        let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        let role = message.mentions.roles.first()
        let motivo = args.slice(2).join(" ")
        let author = message.author;

        if (!member) return error.noUser(message)
        if (!role) return error.noRole(message)
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return error.clientPosition(message)
        if (message.member.roles.highest.position <= member.roles.highest.position) return error.userPosition(message)
        if (message.guild.me.roles.highest.position <= role.position) return error.clientPosition(message)
        if (member.id === message.author.id) return error.autoPunish(message)
        if (!member.roles.cache.has(role.id)) return error.noRole(message)

        member.roles.remove(role)
        const embed = new MessageEmbed()
            .setAuthor(`Sistema De Punições - ${client.user.username} - RemoveRole`, client.user.displayAvatarURL())
            .setColor("#FF0000")
            .addField("Punido", `\`${member.user.tag}\``)
            .addField("Punido ID", `\`${member.id}\``)
            .addField("Punido Por", `\`${author.tag}\``)
            .addField("Author ID", `\`${author.id}\``)
            .addField("Motivo", `\`${motivo || "Não Especificou"}\``)
            .addField("Cargo", `\`${role.name}\``)
            .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
            .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
        message.quote(embed)

        let channel = await message.guild.channels.cache.get(db.get(`cMod_${message.guild.id}`))
        if (!channel) {
            return
        } else {
            const embed1 = new MessageEmbed()
                .setAuthor(`Sistema De Punições - ${client.user.username} - RemoveRole`, client.user.displayAvatarURL())
                .setColor("#FF0000")
                .addField("Punido", `\`${member.user.tag}\``)
                .addField("Punido Por", `\`${author.tag}\``)
                .addField("Motivo", `\`${motivo || "Não Especificou"}\``)
                .addField("Cargo", `\`${role.name}\``)
                .addField("Data", `\`${message.createdAt.toLocaleString()}\``)
                .setFooter(`Punido em ${message.guild.name}`, message.guild.iconURL())
                .setThumbnail(member.user.displayAvatarURL())
            channel.send(embed1)
        }
    }
}