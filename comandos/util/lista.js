const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'lista',
  aliases: ["verlista"],
  usage: 'lista <remover/ deixe em branco se quiser ver sua lista>',
  description: 'mostra uma lista de afazeres que você listou',
  category: 'util',
  run: async (client, message, args) => {
let atual = db.get(`${message.author.id}.lista`) || ['Nada listado!'];
      let conv = {
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣'
      }
      var numbero = Number(1);
    const embed = new Discord.MessageEmbed()
    .setTitle("Sua lista")
    .setDescription(atual.map((a, b) => `${b} - ${a}`).join('\n'))
    .setColor('GREEN')
    message.respond(embed).then(msg => {
      msg.react(client.controllers.emojis.delet);
      let filtro = (reaction, user) => user.id === message.author.id;
      const coletor = msg.createReactionCollector(filtro, { time: 90000 })
      .on('collect', (reaction, user) => {
        if (reaction.emoji.name === 'delete_Fusion') {
          message.respond(`Fale qual a posição da lista você quer remover`).then(msg1 => {
        let collector = message.channel.createMessageCollector(m => 
  m.author.id === message.author.id, {max: 1})
  .on("collect", message => {
      let removePerNumber = message.content;
      if (isNaN(removePerNumber)) return message.channel.send('O número `' + message.content + '` é irreconhecivel para mim, verifique e tente novamente')
      let totais = atual.length - 1
      if (Number(message.content) > totais) return message.channel.send('Hmm, parece que esse número não está na sua lista.');
      atual.splice(Number(removePerNumber), 1);
      message.channel.send(`O item ${removePerNumber} foi removido da lista com sucesso!`)
      db.set(`${message.author.id}.lista`, atual)
  })
    })
        }
      })
    })
      
}
}