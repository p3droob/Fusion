const Discord = require('discord.js')
const db = require('quick.db');
module.exports = {
  name: 'antinsfw',
  aliases: ["anti-nsfw"],
  usage: 'antinsfw on/off',
  category: 'configs',
  run: async (client, message, args) => {

    let anti1 = db.get(`antinsfw_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`Anti-nsfw de ${message.guild.name}`)
    .setDescription(`Reaje com o emoji relacionado a cada opção:
    > 👍 = Ativar\n\n> 👎 = Desativar`)
    let msg1 = await message.respond(embed)
    msg1.react('👍')
    msg1.react('👎')
    let filtro = (reaction, user) => message.author.id === user.id;
let coletor = msg1.createReactionCollector(filtro, {
  time: 90000
})

coletor.on("collect", (reaction, user) => {
  switch (reaction.emoji.name) {
    case '👎':
    if (anti1 === null) {
      return message.reply('O Anti-nsfw já está desativado!')
    }
    message.channel.send(`Anti-nsfw desativado por ${message.author}`)
    db.delete(`antinsfw_${message.guild.id}`)
    break;

    case '👍':
    if (anti1 === true) {
      return message.reply('O Anti-nsfw já está ativado!')
    } else {
    message.channel.send(`Anti-nsfw ativado por ${message.author}`)
    db.set(`antinsfw_${message.guild.id}`, true)
    }
    break;
  }
})
  }
}