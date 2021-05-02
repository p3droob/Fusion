const Discord = require('discord.js');
const quote = require("../../utils/quote.js")
const cooldowns = {};
const ms = require("ms");
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: 'morse',
  aliases: ['códigomorse', 'codigomorse'],
  usage: 'morse <frase ou código a ser codificado/decodificado>',
  description: 'codifica uma frase para o código morse',
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
    const alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const morse = '/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----'.split(',');
    let text = args.join(' ').toUpperCase();
	               if (!text) return message.quote('Insira um texto ou um código para ser decodificado ou codificado'); // but you can change the answer :)

    while (text.includes('Ä') || text.includes('Ö') || text.includes('Ü')) {
      text = text.replace('Ä', 'AE').replace('Ö', 'OE').replace('Ü', 'UE');
    }
    if (text.startsWith('.') || text.startsWith('-')) {
      text = text.split(' ');
      const { length } = text;
      for (i = 0; i < length; i++) {
        text[i] = alpha[morse.indexOf(text[i])];
      }
      text = text.join('');
    } else {
      text = text.split('');
      const { length } = text;
      for (i = 0; i < length; i++) {
        text[i] = morse[alpha.indexOf(text[i])];
      }
      text = text.join(' ');
    }
    const morsereader = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Tradutor de Código Morse')
      .setDescription(`:point_right::radio: Resultado foi: \n \`\`\`${text}\`\`\``);
    await message.quote(morsereader);
  },

};