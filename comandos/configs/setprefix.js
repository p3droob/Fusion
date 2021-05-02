const db = require("quick.db") 
const Discord = require("discord.js")
const quote = require("../../utils/quote.js")

module.exports = {
  name: 'setprefix',
  aliases: ["escolherprefixo", "prefix"],
  usage: `setprefix <novo prefixo>`,
  description: 'Escolhe um novo prefixo para o servidor',
  run: async (client, message, args) => {

const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
let perm = message.member.hasPermission("ADMINISTRATOR"); 
let prefixo = args[0]; 
if(!perm) return message.channel.send("Você não possui permissão de  `administrador`"); 
``
if(!prefixo) return message.channel.send("Você não escreveu um prefixo")
db.set(`${message.guild.id}.prefix`, args[0])

message.quote("**✅ | Prefixo mudado com sucesso!**")

    




  }
  }