const db = require('quick.db');
const Discord = require('discord.js');
const quote = require("../../utils/quote.js");

module.exports = {
  name: 'delete',
  aliases: ["deletar", "del"],
  usage: 'deletar @usuario algo',
  description: 'deletaa algoooooo',
  run: async (client, message, args) => {

    if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send("Apenas meu desenvolvedor pode usar esse comando!");
   };
    const user = client.users.cache.get(args[0]) || message.mentions.users.first();
    const argumentos = args[0]

    if (!user) {
      return message.quote(`Você deve mencionar alguém!`)
    }
    
    if (argumentos === "flocos") {
      db.delete(`flocos_${user.id}`);
      message.quote(`Você deletou as informações de \`flocos\` de ${user} \`(${user.id})\` com sucesso!`)
    }
    
    if (argumentos === "reps") {
      db.delete(`reps_${user.id}`);
      message.quote(`Você deletou as informações de \`reputações\` de ${user} \`(${user.id})\` com sucesso!`)
    }

    if (argumentos === "bugs") {
      db.delete(`bugs_${user.id}`);
      message.quote(`Você deletou as informações de \`bugs\` de ${user} \`(${user.id})\` com sucesso!`)
    }

    if (argumentos === "level") {
      db.delete(`messages_${message.guild.id}_${user.id}`);
      db.delete(`level_${message.guild.id}_${user.id}`);
      message.quote(`Você deletou as informações de \`level\` de ${user} \`(${user.id})\` no servidor **${message.guild.name}** \`${message.guild.id}\`com sucesso!`)
    }

    if (argumentos === "level2") {
      db.delete(`msgglobal_${user.id}`);
      db.delete(`lvlglobal_${user.id}`);
      message.quote(`Você deletou as informações de \`levelglobal\` de ${user} \`(${user.id})\` com sucesso!`)
    }
  }
}