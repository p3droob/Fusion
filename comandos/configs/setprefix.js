const db = require("quick.db") 
const Discord = require("discord.js")

module.exports = {
  name: 'setprefix',
  aliases: ["escolherprefixo", "prefix"],
  usage: `setprefix <novo prefixo>`,
  description: 'Escolhe um novo prefixo para o servidor',
  category: 'configs',
  run: async (client, message, args) => {

const prefix = db.get(`${message.guild.id}.prefix`) || 'f!';
let perm = message.member.hasPermission("ADMINISTRATOR"); 
let prefixo = args[0]; 
if(!perm) return message.channel.send("Você não possui permissão de  `administrador`"); 
``
if(!prefixo) return message.channel.send("Você não escreveu um prefixo")
if (prefixo.length > 3) return message.respond(`Escreva um prefixo menor que 3 caracteres!`)
db.set(`${message.guild.id}.prefix`, args[0])
client.db.ref(`Guilds/${message.guild.id}`).update({
  prefix: args[0]
})
message.respond("**✅ | Prefixo mudado com sucesso para! ** \`" + args[0] + "`")

    




  }
  }