const jimp = require("jimp")
const Discord = require('discord.js')
const emoji = require("../../utils/emojis.js")

module.exports = {
  name: "trump",
  aliases: ["saytrump"],
  usage: "trump <mensagem que trump irá falar>",
  description: 'trump irá falar uma mensagem',
  category: 'fun',
  run: async (client, message, args) => {
        let img = jimp.read("https://cdn.discordapp.com/attachments/814601802703175771/817326604325879828/trump-1.png")
        if (!args[0]) return message.respond("Escreva algo para o trump falar.")
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(885, 494)
                image.print(font, 20, 120, args.join(" "), 600)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "trump.png"}]})
                })
            })
        })
    }
}