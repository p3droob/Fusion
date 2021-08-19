const jimp = require("jimp")
const Discord = require('discord.js')

module.exports = {
  name: 'laranjo',
  category: 'fun',
  usage: 'laranjo <frase>',
run: async (client, message, args) => {


        let img = jimp.read("https://i.imgur.com/cfHzjjo.png")
        if (!args[0]) return message.reply("Escreve algo para o laranjo!")
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(685, 510)
                image.print(font, 1, 1, args.join(" "), 160)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "laranjo.png"}]})
                })
            })
        })
    }
}