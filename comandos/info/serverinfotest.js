const Discord = require("discord.js"); 
const moment = require("moment")
moment.locale('pt-br') 
module.exports = {
  name: 'serverinfo',
  aliases: ["sinfo", "si", "serveri"],
  usage: 'serverinfo',
  description: 'mostra as informações do servidor',
  run: async (client, message, args) => {
 
 let boost = message.guild.premiumSubscriptionCount === 0 ? "Não há boost(s)." : `${message.guild.premiumSubscriptionCount} Boost(s)`; // criando variavel, para ver a quantia de boosts..
    let serverembed = new Discord.MessageEmbed() 
    .setColor("#ff0000")
    .addFields(
      {
        name: `**<:rei_Fusion:831121925820121118> | Dono do servidor**`,
        value: `\`\`${message.guild.owner.user.tag} (${message.guild.owner.id})\`\``
      },
      {
        name: `**<a:download:826103385623101470> Criado em**`,
        value: `${moment.utc(message.guild.createdAt).format("LLL")} (${moment.utc(message.guild.createdAt, "YYYYMMDD").fromNow()})`
      },
      {
        name: `**<:host_Fusion:831121757732601898> ID do servidor**`,
        value: `\`\`${message.guild.id}\`\``
      },
      {
        name: `**📥 Você entrou em**`,
        value: `${moment.utc(message.member.joinedAt).format("LLL")} (${moment.utc(message.member.joinedAt, "YYYYMMDD").fromNow()})`
      },
      {
        name: `**<:membros:831537357953302559> Membros**`,
        value: `🤖 ${message.guild.members.cache.filter(member => member.user.bot).size} Bots\n👨 ${(message.guild.memberCount) - (message.guild.members.cache.filter(member => member.user.bot).size)} Humanos\n🏠 ${message.guild.memberCount} Total`
      },
      {
        name: `**Entrei aqui em**`,
        value: `${moment.utc(message.guild.me.joinedAt).format("LLL")} (${moment.utc(message.guild.me.joinedAt, "YYYYMMDD").fromNow()})`
      },
      {
        name: `Canais`,
        value: `<:c_voz:831536890833666098> ${message.guild.channels.cache.filter(chan => chan.type === 'voice').size} Canais de Voz \n <:canal:831537857554284604>${message.guild.channels.cache.filter(chan => chan.type === 'text').size} Canais de Texto \n <:pasta:831539225160843274>${message.guild.channels.cache.filter(chan => chan.type === 'category').size} Categorias`
      },
      {
        name: `Quantidade de boosts`,
        value: `${boost}`
      }
    )
    .setAuthor(`Serverinfo de ${message.guild.name}`)
    .setThumbnail(`${message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 })}`)
   .setFooter(` | Comando requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
 
    message.channel.send(serverembed);
 
 }
 }