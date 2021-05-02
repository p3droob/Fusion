const Discord = require("discord.js")
const db = require('quick.db')
const quote = require('../../utils/quote.js')
const cooldowns = {}
const ms = require("ms")
const emoji = require('../../utils/emojis.js')


module.exports = {
  name: 'atm',
  aliases: ["saldo", "bal", "flocos", "snowflakes"],
  usage: 'atm <usuário ou id>',
  description: 'mostra o saldo de alguém',
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

    const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

    const atm = db.get(`flocos_${user.id}`) || 0;

    
    message.quote(`${user} possui ${atm} flocos :snowflake:`)
  }
}