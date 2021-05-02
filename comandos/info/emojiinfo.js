const Discord = require('discord.js')
const moment = require('moment')
moment.locale("pt-BR");
module.exports = {
    name: "emojiinfo",
    aliases: ["infoemoji"],
    usage: "emojiinfo <emoji>",
    description: "mostra as informações de um emoji",
    async run(client, message, args) {
        let emojiName = args.join(" ");
        let emoji = message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.find(emoji => emoji.name === `${emojiName}`) 
        if (!args[0]) return message.channel.send("Por favor, me dê o nome ou id do emoji")
        if (!emoji) return message.channel.send("Por favor, me dê um nome ou id **válido**")
        let xd;
        if(emoji.animated) xd = "Animado"
        if(!emoji.animated) xd = 'Estático'
        let embed = new Discord.MessageEmbed()

            .addField("Nome", `${emoji.name}`)
            .addField("id do emoji", `${emoji.id}`)
            .addField("Emoji", `${emoji}`)
            .addField("Criado em", `${moment(emoji.createdTimestamp).format('LT')} ${moment(emoji.createdTimestamp).format('LL')} ${moment(emoji.createdTimestamp).fromNow()}`)
            .addField("Servidor", message.guild.name)
            .addField("Tipo de emoji:", xd)
            .setThumbnail(emoji.url)
            .setColor("#ff0000")
            .addField("Menção", `\`<:${emoji.name}:${emoji.id}>\``)
            .addField("URL", `[clique aqui](${emoji.url})`)

        message.channel.send(embed)
    }
}