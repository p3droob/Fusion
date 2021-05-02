const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
const quote = require("../../utils/quote.js")
const cooldowns = {}
const ms = require("ms")
const emoji = require('../../utils/emojis.js')

module.exports = {
  name: 'pay',
  aliases: ['pagar'],
  usage: 'pay <usuário> <valor>',
  description: 'paga uma quantia a um usuário',
  run: async (client, message, args) => {

    const name = 'pay';
          //cooldown


    if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {
        lastCmd: null
      }
let ultimoCmd = cooldowns[message.author.id].lastCmd 
     let timeout = 5000
    if (ultimoCmd !== null && timeout- (Date.now() - ultimoCmd) > 0) {
let time = ms(timeout - (Date.now() - ultimoCmd)); 
let resta = [time.seconds, 'segundos']
 
if(resta[0] == 0) resta = ['alguns', 'millisegundos']
if(resta[0] == 1) resta = [time.seconds, 'segundo']
    message.channel.send(`${emoji.aviso} **|** Calma aí! ${message.author} você precisa esperar **${time}** para executar outro comando! 🙅`).then(msg=> {
    msg.delete({ timeout: 10000 });
        })
       return;
    } else {
                 cooldowns[message.author.id].lastCmd = Date.now() 
    }
    
    const prefix = db.get(`${message.guild.id}.prefix`) || 'f!'
    const comando = client.commands.get(name) || client.commands.find((cmd) => cmd.aliases.includes(name))
    const adg = new MessageEmbed()
      .setColor("#0cfffb")
      .setTitle(`💸 | \`${prefix}pay\``)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription("🤔 |Como usar?\n\n 📕 | **Exemplos**")
      .addFields(
      { name: `🔹 Pagar pessoa por menção`, value: `\`${prefix}pay Mr. Frozen Fire#8208 500\``},
      { name: `🔹 Pagar pessoa por ID`, value: `\`${prefix}pay 753252894974804068 1000\``},
      { name: "Aliases:", value: `\`${comando.aliases.join(", ")}\``}
      ) 
      .setFooter(`| Comando requisitado por: ${message.author.tag} • Economia`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));

    const user = message.mentions.members.first() || client.users.cache.get(args[0]);

    const args1 = args[1].replace(`k`, '000').replace(`m`, '000000').replace(`kk`, '000000')

    if (user == message.author.id) return message.quote('Você não pode transferir flocos para si mesmo');

    if (!user) {
      return message.quote(adg);
    }

    if (isNaN(args1.replace(`k`, '000'))) return message.quote('Digite números **válidos**!');

    if (!args1) {
      return message.quote('Especifique uma quantidade para ser transferida');
    }

    if (message.content.includes('-')) {
      return message.quote('Você não pode transferir flocos negativos');
    }

    const fetchValue = db.fetch(`flocos_${message.author.id}`);

    if (args1 > fetchValue) return message.quote('Você não tem flocos suficiente');

    message.reply(`:snowflake:Você deseja mesmo transferir ${args1.replace('k', '000')} flocos para ${user.user}?`).then((sentMessage) => {
      sentMessage.react('✅');
      const filter = (reaction, usuario) => reaction.emoji.name === '✅' && usuario.id === message.author.id;
      const Collector = sentMessage.createReactionCollector(filter, { max: 1, time: 60000 });

      sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })

      Collector.on('collect', () => {
        message.quote(`Você pagou ${args1.replace('k', '000')} flocos para ${user.user}`);
        db.add(`flocos_${user.id}`, args1.replace(`k`, '000'));
        db.subtract(`flocos_${message.author.id}`, args1.replace(`k`, '000'));
      })

    });
  },
};