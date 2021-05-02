const db = require('quick.db');
const Discord = require('discord.js');
const quote = require("../../utils/quote.js");

module.exports = {
  name: 'remove',
  description: 'remove algoooooo',
  run: async (client, message, args) => {

    const not = new Discord.MessageEmbed()
    .setAuthor(`insira um número válido!`);
    if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send("Apenas meu desenvolvedor pode usar esse comando!");
   };
    const user = client.users.cache.get(args[0]) || message.mentions.users.first();

    if (!user) {
      return message.quote(`Você deve mencionar alguém!`)
    }
    const argument = args[0]
    if (!argument) return message.quote(`a`)

    if (argument === "flocos") {
      let amount = args[2]
      if (isNaN(amount)) return message.quote(not)
      db.subtract(`flocos_${user.id}`, amount);
      let atual = db.fetch(`flocos_${user.id}`) || 0;
      message.quote(`Você removeu ${amount} das informações de \`${argument}\` de ${user} \`(${user.id})\` com sucesso! Agora ele possui ${atual} ${argument}`)
    }
    
    if (argument === "reps") {
      let amount = args[2]
      if (isNaN(amount)) return message.quote(not)
      db.subtract(`reps_${user.id}`, amount);
      let atual = db.fetch(`reps_${user.id}`) || 0;
      message.quote(`Você removeu ${amount} as informações de \`${argument}\` de ${user} \`(${user.id})\` com sucesso! Agora ele possui ${atual} ${argument}`)
    }

    if (argument === "bugs") {
      let amount = args[2]
      if (isNaN(amount)) return message.quote(not)
      db.subtract(`bugs_${user.id}`, amount);
      let atual = db.fetch(`bugs_${user.id}`) || 0;
      message.quote(`Você removeu ${amount} as informações de \`${argument}\` de ${user} \`(${user.id})\` com sucesso! Agora ele possui ${atual} ${argument}`)
    }

      if (argument === "xp") {
      let amount = args[2]
      db.subtract(`messages_${message.guild.id}_${user.id}`, amount);
      let atual = db.fetch(`message_${message.guild.id}_${user.id}`) || 0;
      message.quote(`Você v ${amount} as informações de \`${argument}\` de ${user} \`(${user.id})\` no servidor **${message.guild.name}** \`${message.guild.id}\`com sucesso! Agora ele possui ${atual} ${argument}`)
    }

    if (argument === "xp2") {
      let amount = args[2]
      db.subtract(`msgglobal_${user.id}`, amount);
      let atual = db.fetch(`msgglobal_${user.id}`) || 0;
      message.quote(`Você removeu ${amount} as informações de \`${argument}\` de ${user} \`(${user.id})\` com sucesso! Agora ele possui ${atual} ${argument}`)
    }
  }
}