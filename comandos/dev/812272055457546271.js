const Discord = require('discord.js')
module.exports = {
    name: "812272055457546271",
    aliases: ['iddomeubot'],
    async run(client, message, args) {
   if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send("Apenas meu desenvolvedor pode usar esse comando!");
   };
     const sayMessage = args.join(' ');
     message.channel.send(`${sayMessage}`)
     }
     }