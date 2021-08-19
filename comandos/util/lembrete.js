const { MessageEmbed } = require("discord.js")
const ms = require("ms")
const emoji = require("../../utils/emojis.js")
const error = require("../../utils/errors.js")

module.exports = {
  name: "lembrar",
  aliases: ["lembrete", "despertador", "lembrar"],
  description: "Lembra você de algo em um tempo setado",
  usage: "lembrar <algo>",
  category: 'util',
  run: async (client, message, args) => {

    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)

message.respond(`**${emoji.carregando} | Do que você quer que eu te lembre?**`).then(msg => {
  let collector = message.channel.createMessageCollector(m => 
  m.author.id === message.author.id, {max: 1})
  .on("collect", message => {
    message.delete()

    let motivo = message.content;
    if(motivo.length > 500) return message.channel.send(`**${emoji.errado} | Você deve me dar um texto menor que 500 caracteres!**`)

    msg.edit(`** Me dê um tempo, exemplo: \`1m = 1 minuto, 2h = 2 horas ou utilize uma numeração em milisegundos!\`**`).then(msg2 => {
      let collector2 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, {max: 1})
      .on("collect", message => {
        message.delete()
        let tempo = message.content;
        if(tempo.length > 5) return message.channel.send(`**${emoji.errado} Você não especificou um tempo**`)

        msg.edit(`${emoji.certo} **${message.author}, irei lembrar você de: \`${motivo}\` , daqui: ${tempo}!**`)
    setTimeout(function() {
    const embed = new MessageEmbed()
    .setDescription(`${emoji.aviso} | **${message.author} você se lembra de \`${motivo}\`?**`)
    .setColor("#ff0000")
    message.channel.send(`${message.author}`, embed)
    }, ms(tempo, {long: true}))
      })
    })
  })

})

  }
}