const figlet = require('figlet');
const quote = require("../../utils/quote.js");
const cooldowns = {};
const ms = require("ms");
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: 'ascii',
  aliases: ['sayascii'],
  usage: 'ascii <mensagem>',
  description: 'Manda uma mensagem e ascii',
  run: async (client, message, args) => {

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
    if (!args[0]) return message.quote('Por favor Digite algo');
    if (args[0].length > 32) return message.quote('Você não pode digitar mais de 32 caracteres');
    let msg = args.join(' ');

    figlet.text(msg, (err, data) => {
      if (err) {
        message.quote('Algo deu errado ao executar este comando');
        message.quote(err);
      }
      if (data.length > 2000) return message.quote('Por favor digite algo com menos de 2000 caractéres!');

      message.quote(`\`\`\`${data}\`\`\``);
    });
  },

};