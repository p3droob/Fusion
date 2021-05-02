const Discord = require('discord.js'); // puxar a livraria do Discord
const quote = require("../../utils/quote.js")
const cooldowns = {};
const ms = require("ms");
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: 'roll',
  aliases: ["rolar", "rolarnúmero"],
  usage: 'roll <número>',
  description: "rola um número",
run: async (client, message, args) => { // definir o que o comando poderá fazer
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

const argumento = args[0]; // determinar o primeiro argumento

const ese = new Discord.MessageEmbed()
.setDescription('Fale um valor válido!')

if(!args[0]) return message.quote(ese) // caso não fale o número

let sorte = Math.floor(Math.random() * argumento) + 1; // colocar um número aleatório

const embed = new Discord.MessageEmbed()
.setTitle('Resutado do roll:')
.setDescription(`${sorte}`)
.setImage('https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif') // criar a embed

message.quote(embed); // enviar a embed
}
}