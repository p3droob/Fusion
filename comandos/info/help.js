const Discord = require('discord.js');
const quote = require("../../utils/quote.js")

module.exports = {
  name: 'help',
  aliases: ["ajuda"],
  usage: 'help',
  description: 'um comando interativo de ajuda',
  run: async (client, message, argumentos, arg_teste, chat) => {
    const { guild } = message
  const icon = guild.iconURL()
  const comandos = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setThumbnail(icon)
  .setTitle('<a:coroa_Fusion:816983856141172766> - Ajuda - Fusion:')
  .setDescription(`> 🌐Links\n\n [Servidor de suporte](https://discord.com/AxcQf5Pf58)\n\n[Me adicione](https://discord.com/oauth2/authorize?client_id=812272055457546271&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D812272055457546271%26permissions%3D8%26redirect_uri%3Dhttps%253A%252F%252Fdiscord.com%252Fapi%252Foauth2%252Fauthorize%253Fclient_id%253D812272&scope=bot)\n\n**COMANDOS**\n\n**Olá ${message.author}, Clique no emoji de acordo com a sua função:** \n\n <a:1_Fusion:822833351828308032> <a:setaFusion:816816386843738162> **ECONOMIA**\n\n <a:2_Fusion:822833386623074324> <a:setaFusion:816816386843738162> **STAFF**\n\n <a:3_Fusion:822833421041532929> <a:setaFusion:816816386843738162> **DIVERSÃO**\n\n <a:4_Fusion:822833512222425138> <a:setaFusion:816816386843738162> **BOT**\n\n  <a:5_Fusion:822833559420796968> <a:setaFusion:816816386843738162> **INFO**\n\n <:voltar_Fusion:832577187483353098> = Voltar ao menu`)
  .setTimestamp() 
  .setImage("")
  .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
 
  message.quote(comandos).then(msg => {
    msg.react('822833351828308032').then(r => {
      msg.react('822833386623074324').then(r => {
        msg.react('822833421041532929').then(r => {
          msg.react('822833512222425138').then(r => {
            msg.react('822833559420796968').then(r => {
              msg.react('832577187483353098').then(r => {
              })
        })
        })
        })
      })
    })
 
    const geralFilter = (reaction, user) => reaction.emoji.name === '1_Fusion' && user.id === message.author.id;
      const staffFilter = (reaction, user) => reaction.emoji.name === '2_Fusion' && user.id === message.author.id;
    const diverFilter = (reaction, user) => reaction.emoji.name === '3_Fusion' && user.id === message.author.id;
        const botFilter = (reaction, user) => reaction.emoji.name === '4_Fusion' && user.id === message.author.id;
            const infoFilter = (reaction, user) => reaction.emoji.name === '5_Fusion' && user.id === message.author.id;
            const menuFilter = (reaction, user) => reaction.emoji.name === 'voltar_Fusion' && user.id === message.author.id;
 
    const geral = msg.createReactionCollector(geralFilter);
      const staff = msg.createReactionCollector(staffFilter);
    const diver = msg.createReactionCollector(diverFilter);
            const bot = msg.createReactionCollector(botFilter);
            const info = msg.createReactionCollector(infoFilter);
            const menu = msg.createReactionCollector(menuFilter);


 
 
    geral.on('collect', r2 => {
      const db = require('quick.db');
      const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
      const embed = new Discord.MessageEmbed()
      .setTitle('ECONOMIA')
      .setThumbnail(icon)
       .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
       .addFields(
        {
          name: `\`\`${prefix}atm\`\``,
          value: 'Mostra seu saldo no banco'
        },
        {
          name: `\`\`${prefix}shop\`\``,
          value: 'Abre a loja'
        },
        {
          name: `\`\`${prefix}daily\`\``,
          value: 'Pegue seu prêmio diário'
        },
        {
          name: `\`\`${prefix}buy\`\``,
          value: 'Compre um item da loja'
        },
        {
          name: `\`\`${prefix}pay\`\``,
          value: 'Paga uma quantia a um jogador'
        },
        {
          name: `\`\`${prefix}inv\`\``,
          value: 'Mostra o seu inventário'
        }
      )
      .setColor('#ff0000')
      msg.edit(embed);
      })
 
   staff.on('collect', r2 => {
      const db = require('quick.db');
      const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
      const embed = new Discord.MessageEmbed()
      .setTitle('STAFF')
      .setThumbnail(icon)
      .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
      .addFields(
        {
          name: `\`\`${prefix}lock/unlock\`\``,
          value: 'Tranca/destranca um canal'
        },
        {
        name: `\`\`${prefix}expulsar\`\``,
        value: 'Expulsa um membro'
        },
        {
          name: `\`\`${prefix}banir\`\``,
          value: 'Bane um usuário'
        },
        {
          name: `\`\`${prefix}slowmode\`\``,
          value: 'Ativa o modo lento no canal'
        },
        {
          name: `\`\`${prefix}setsugerir\`\``,
          value: 'escolhe o canal em que as sugestões serão enviadas'
        },
        {
          name: `\`\`${prefix}addemoji\`\``,
          value: 'Adiciona um emoji ao servidor'
        },
        {
          name: `\`\`${prefix}mute\`\``,
          value: 'Silencia um usuário'
        },
        {
          name: `\`\`${prefix}sorteio\`\``,
          value: 'Faz um sorteio'
        },
        {
          name: `\`\`${prefix}addrole\`\``,
          value: 'Adiciona um cargo a alguém'
        },
        {
          name: `\`\`${prefix}setprefix\`\``,
          value: 'Escolhe um novo prefixo para o servidor'
        },
        {
          name: `\`\`${prefix}warn\`\``,
          value: 'Adiciona um aviso a um usuário'
        },
        {
          name: `\`\`${prefix}removewarn\`\``,
          value: 'Remove avisos de um usuário'
        }
      )
      .setColor('#ff0000')
      msg.edit(embed);
    })
 
    diver.on('collect', r2 => {
      const db = require('quick.db');
      const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
      const embed = new Discord.MessageEmbed()
      .setTitle('DIVERSÃO')
      .setThumbnail(icon)
     .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
      .addFields(
        {
          name: `\`\`${prefix}coinflip\`\``,
          value: 'Escolha cara ou coroa'
        },
        {
          name: `\`\`${prefix}afk\`\``,
          value: 'Isso te deixará afk'
        },
        {
          name: `\`\`${prefix}sugerir\`\``,
          value: 'Manda uma sugestão'
        },
        {
          name: `\`\`${prefix}invites\`\``,
          value: 'Mostra os invites do servidor'
        },
        {
          name: `\`\`${prefix}lutar\`\``,
          value: 'Lute com um usuário'
        },
        {
          name: `\`\`${prefix}trump\`\``,
          value: 'Trump irá falar por você'
        },
        {
          name: `\`\`${prefix}reportarbug\`\``,
          value: 'Reporte um bug'
        },
        {
          name: `\`\`${prefix}ship\`\``,
          value: 'Shipe alguém com alguém'
        },
        {
          name: `\`\`${prefix}servidores\`\``,
          value: 'Mostra a quantidade de servidores em que estou'
        },
        {
          name: `\`\`${prefix}traduzir\`\``,
          value: 'Traduza para uma das seguintes línguas\n\n**(auto) Automatic, (ar) Arabe, (ho) Holandes, (en) Inglês, (fr) Francês, (al) Alemão, (el)Grego, (it) Italiano, (ja) Japonês, (jw) Javanes, (kn) Kannada, (ko) Coreano, (pt) Portugues, (ro) Romano, (ru) Russo, (es) Espanhol. Exemplo: F!traduzir pt en Cachorro, Resposta: Dog**'
        },
        {
          name: `\`\`${prefix}roll\`\``,
          value: 'Role um número'
        }
      )
      .setColor('#ff0000')
      msg.edit(embed);
    })
 bot.on('collect', r2 => {
      const db = require('quick.db');
      const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
      const embed = new Discord.MessageEmbed()
      .setTitle('BOT')
      .setThumbnail(icon)
      .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
       .addFields(
        {
          name: `\`\`${prefix}botinfo\`\``,
          value: 'Mostra informações sobre mim'
        },
        {
          name: `\`\`${prefix}invite\`\``,
          value: 'Me convide para o seu servidor!'
        },
        {
          name: `\`\`${prefix}uptime\`\``,
          value: 'Mostra a quanto tempo eu estou ativo desde a última atualização'
        },
        {
          name: `\`\`${prefix}ping\`\``,
          value: 'Mostra o meu ping'
        },
        {
          name: `\`\`${prefix}votar\`\``,
          value: 'Vote em mim'
        }
      )
      .setColor('#ff0000')
      msg.edit(embed);
      })
       info.on('collect', r2 => {
      const db = require('quick.db');
      const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
      const embed = new Discord.MessageEmbed()
      .setTitle('INFO')
      .setThumbnail(icon)
      .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
       .addFields(
        {
          name: `\`\`${prefix}membros\`\``,
          value: 'Mostra quantos membros esse servidor possui'
        },
        {
          name: `\`\`${prefix}serverinfo\`\``,
          value: 'Mostra informações sobre o servidor'
        },
        {
          name: `\`\`${prefix}userinfo\`\``,
          value: 'Mostra informações de um usuário'
        },
        {
          name: `\`\`${prefix}avatar\`\``,
          value: 'Mostra o avatar de um usuário'
        },
        {
          name: `\`\`${prefix}warns\`\``,
          value: 'Mostra os warns de um usuário'
        }
      )
      .setColor('#ff0000')
      msg.edit(embed);
      })
          menu.on('collect', r2 => {
      const db = require('quick.db');
      const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
      const menu = new Discord.MessageEmbed()

  .setColor('#ff0000')
  .setThumbnail(icon)
  .setTitle('<a:coroa_Fusion:816983856141172766> - Ajuda - Fusion:')
  .setDescription(`> 🌐Links\n\n [Servidor de suporte](https://discord.com/AxcQf5Pf58)\n\n[Me adicione](https://discord.com/oauth2/authorize?client_id=812272055457546271&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D812272055457546271%26permissions%3D8%26redirect_uri%3Dhttps%253A%252F%252Fdiscord.com%252Fapi%252Foauth2%252Fauthorize%253Fclient_id%253D812272&scope=bot)\n\n**COMANDOS**\n\n**Olá ${message.author}, Clique no emoji de acordo com a sua função:** \n\n <a:1_Fusion:822833351828308032> <a:setaFusion:816816386843738162> **ECONOMIA**\n\n <a:2_Fusion:822833386623074324> <a:setaFusion:816816386843738162> **STAFF**\n\n <a:3_Fusion:822833421041532929> <a:setaFusion:816816386843738162> **DIVERSÃO**\n\n <a:4_Fusion:822833512222425138> <a:setaFusion:816816386843738162> **BOT**\n\n  <a:5_Fusion:822833559420796968> <a:setaFusion:816816386843738162> **INFO**\n\n <:voltar_Fusion:832577187483353098> = Voltar ao menu`)
  .setTimestamp() 
  .setImage("")
  .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
      msg.edit(menu);
      })
 
 
 
  })
 
 
 
 
 
  }
 
}