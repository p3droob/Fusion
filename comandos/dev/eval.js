const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "eval",
  aliases: ["e"],
  run: async (client, message, args) => {

    let dev = `753252894974804068`


    if (![`${dev}`].some(a => message.author.id === a)) return message.reply('Só meus criadores podem usar este comando!')
    const code = args.join(' ')
    if (!code)
      return message.reply(
        `Insira um valor para executar o eval.`
      );
    await message.reply('.').then(async m => {
      try {
        let beforeRunning = Date.now()
        let result = eval(code)

        if (result instanceof Promise) {
          m.edit('Uma promise encontrada, estou esperando ela ser resolvida!')
          await result
        }
        if (typeof result !== 'string') result = require('util').inspect(result)
        let end = (Date.now() - beforeRunning)
        let embed = new MessageEmbed(message.author).setTimestamp()
          .setTitle(' Codigo Correto')
          .setDescription('```' + result.slice(0, 2000) + '```')
          .setColor('GREEn')
        m.edit({ embed: embed })
      } catch (e) {
        let embed = new MessageEmbed(message.author).setTimestamp()
          .setTitle('Código Incorreto')
          .setDescription('```' + e.stack.slice(0, 2000) + '```')
          .setColor("ff0000")
        m.edit({ embed: embed })
      }
    })
  }
}