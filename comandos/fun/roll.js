const Discord = require('discord.js');
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: 'roll',
  aliases: ["rolar", "rolarnúmero"],
  usage: 'roll <número>',
  description: "rola um número",
  category: 'fun',
run: async (client, message, args) => {

const argumento = args[0];

const ese = new Discord.MessageEmbed()
.setDescription('Fale um valor válido!')

if(!args[0]) return message.respond(ese) // caso não fale o número

let sorte = Math.floor(Math.random() * argumento) + 1; // colocar um número aleatório

const embed = new Discord.MessageEmbed()
.setTitle('Resutado do roll:')
.setDescription(`${sorte}`)
.setImage('https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif') // criar a embed

message.respond(embed); // enviar a embed
}
}