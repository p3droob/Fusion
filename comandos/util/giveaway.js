const ms = require("ms");
const Discord = require("discord.js");

    module.exports = {
    name: 'giveaway',
    aliases: ["sorteio"],
  category: 'util',
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.respond(`**Você precisa da permissão de \`Gerenciar Mensagens\` para executar este comando**`).then(m => m.delete({ timeout: 60000 }))
        message.channel.send('Qual será o tempo do sorteio?\n> Dica:\nm = minuto\nd = dia\ns = segundo.').then(msg => {
            let collector = message.channel.createMessageCollector(m => 
  m.author.id === message.author.id, {max: 1})
  .on("collect", message => {
      message.delete()
      let tempo = message.content;
      msg.edit('Qual será o prêmio do sorteio?').then(msg2 => {
          let collector2 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, {max: 1})
      .on("collect", message => {
          message.delete()
          let prize = message.content;
          msg2.edit('Em qual canal será realizado o sorteio?').then(msg3 => {
              let collector3 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, {max: 1})
      .on("collect", message => {
          let canal = message.mentions.channels.first();
          if (!canal) return message.channel.send('Canal inválido!')
          if (!canal.permissionsFor(client.user.id).has('SEND_MESSAGES')) return message.channel.send('Não possuo permissão de enviar mensagens nesse canal')
msg3.edit('Qual emoji será usado no sorteio?').then(msg10 => {
              let collector3 = message.channel.createMessageCollector(m => 
      m.author.id === message.author.id, {max: 1})
      .on("collect", message => {
let emojo = message.emojis.first();
if (!emojo) return message.channel.send('Insira um emoji válido!')
let emojo1;
if (emojo.animated) emojo1 = `<a:${emojo.name}:${emojo.id}>`
if (!emojo.animated) emojo1 = `<:${emojo.name}:${emojo.id}>`
          var canal2 = client.channels.cache.get(canal.id)
          let embed = new Discord.MessageEmbed()
          .setTitle('Novo sorteio!')
          .addFields(
              [
                  {
                      name: 'Prêmio', 
                      value: prize
                  },
                  {
                      name: 'Tempo: ' + tempo,
                      value: '_'
                  },
                  {
                      name: 'Reaja com ' + emojo1 +' para parcicipar!',
                      value: '_'
                  }
                  ]
                  )
          let sorteado = canal2.send(embed).then(msg5 => {
            var array = new Array();
            msg5.react(`${emojo1}`)
            let filter = (reaction, user) => user.id !== client.user.id;
            let coletor = msg5.createReactionCollector(filter)
            coletor.on("collect", (reaction, user) => {
              array.push(user.id)
            })
          setTimeout(() => {
              if (array.length <= 1) {
        return message.channel.send(
          ` Ninguém reagiu, o sorteio foi cancelado.`
        );
      }
      let gg = array[Math.floor(Math.random() * array.length)];
              canal2.send(`O ganhador do sorteio foi <${gg}>`)
          }, ms(tempo))
          })
      })
          })
      })
      })
  })
        })
})
})
}
}