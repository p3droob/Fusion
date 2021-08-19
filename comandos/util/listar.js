const Discord = require('discord.js')
const db = require('quick.db');

module.exports = {
  name: 'listar',
  aliases: ["adicionarlista"],
  description: 'adiciona algo à sua lista',
  usage: 'lista <remover/ deixe em branco se quiser ver sua lista>',
  category: 'util',
  run: async (client, message, args) => {
    
    let algo = args.join(" ")
    if (message.content.includes('rola', 'pqp', 'foda', 'cu', 'gf')) {
      return message.respond("Por favor seja educado!")
      }
      if (!algo) return message.respond('Insira algo para listar!')
    db.push(`${message.author.id}.lista`, algo)
    message.respond(`${message.author}, você adicionou \`${algo}\` à sua lista!`)
  
}
}