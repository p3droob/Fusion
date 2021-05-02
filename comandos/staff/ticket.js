const Discord = require('discord.js')
module.exports = {
  name: "ticket",
  aliases: ["abrirticket"],
  usage: 'ticket',
  description: 'cria uma mensagem que quem clicar na reação sera direcionado para um canal de suporte',
  run: async (client, message, argumentos, arg_teste, chat, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`${message.author}, Você não tem a permissão de **administrador**!`)
        return message.channel.send(embed);
      }
  const { guild } = message
  const icon = guild.iconURL()
  const comandos = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setThumbnail(icon)
  .setImage('https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif')
  .setTitle('🎟️ - Ticket')
  .setDescription(`Olá, clique no emoji para criar um ticket!`)
  .setTimestamp()
  .setFooter(`Apenas administradores podem enviar essa mensagem`, message.author.displayAvatarURL({Size: 32}))

message.channel.send(comandos).then(msg => {
    msg.react('🎟️').then(r => { 
    })

    const prosseguirFilter = (reaction, user) => reaction.emoji.name === '🎟️';
 
    const prosseguir = msg.createReactionCollector(prosseguirFilter);
 
    prosseguir.on('collect', r2 => {
    const user = message.author;
    const name = `ticket-${message.guild.name}`;
    if(message.guild.channels.cache.find(ch => ch.name == name)) {
      console.log()
    }else message.guild.channels.create(name).then((chan)=>{
chan.updateOverwrite(message.guild.roles.everyone, {
    SEND_MESSAGES: false,
    VIEW_CHANNEL: false
})
chan.updateOverwrite(user,{
    SEND_MESSAGES: true,
    VIEW_CHANNEL: true
})
chan.send("O suporte estará aqui em breve...").then((m)=>{ m.pin() })
})
})
})
}
}