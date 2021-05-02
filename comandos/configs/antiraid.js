const Discord = require("discord.js")
const db = require("quick.db")
const emoji = require("../../utils/emojis.js")

module.exports = {
  name: "antiraid",
  aliases: ["defesa", "antiraiding"],
  description: "Use para proteger seu servidor!",
  run: async (client, message, args) => {
if(!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return error.permissionFor(message)
if(!message.member.hasPermission("ADMINISTRATOR")) return message.inlineReply(`**${emoji.errado} Você precisa da permissão de \`administrator\` para realizar este comando!**`)

const embed = new Discord.MessageEmbed()
.setTitle(`<:configs:824879803306868766> AntiRaid`)
.setDescription("Para realizar a configuração do antiraid clique no emoji que indica cada categoria:\n\n**Ativar**\n**<:suporte_Fusion:824603708783460422> <a:setaFusion:816816386843738162> `Anti-Fake`**\n**<a:download_Fusion:826103385623101470> <a:setaFusion:816816386843738162> `Anti-Invite`**\n**<:host_Fusion:831121757732601898> <a:setaFusion:816816386843738162> `Anti-Bot`**\n**<a:carregando_Fusion:824602024314273792> <a:setaFusion:816816386843738162> `Captcha`**\n\n**Desativar**\n\n**<:b_delete:835233267640434750> | `Anti-Fake`**\n**<:b_link:835234866878087179> <a:setaFusion:816816386843738162> `Anti-Invite`**\n**<:b_mundo:835235915319869451> <a:setaFusion:816816386843738162> `Anti-Bot`**\n**<:b_wifi:835236250558005269> <a:setaFusion:816816386843738162> `Captcha`**")
.setThumbnail(message.guild.iconURL())
.setColor("BLACK")
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())

var msg = await message.inlineReply(embed)
await msg.react("<:suporte_Fusion:824603708783460422>")
await msg.react("<a:download_Fusion:826103385623101470>")
await msg.react("<:host_Fusion:831121757732601898>")
await msg.react("<a:carregando_Fusion:824602024314273792>")
await msg.react("<:b_delete:835233267640434750>")
await msg.react("<:b_link:835234866878087179>")
await msg.react("<:b_mundo:835235915319869451>")
await msg.react("<:b_wifi:835236250558005269>")
let filtro = (reaction, user) => message.author.id === user.id;
let coletor = msg.createReactionCollector(filtro, {
  time: 90000
})
coletor.on("collect", (reaction, user) => {
  switch (reaction.emoji.name) {
    case "suporte_Fusion":
  try {
let fake = db.get(`antifake_${message.guild.id}`)
if(fake) {
 return message.channel.send(`${emoji.errado}** Este modulo ja está ligado**`)
} else {
   message.channel.send(`${emoji.certo}** Você ligou o anti-fake, agora todos usuários com menos de 7 dias de conta serão expulsos**`)
  db.set(`antifake_${message.guild.id}`, true)
  
}
  } catch (e) {
    return;
  }
    break;
    case "download_Fusion":
try {
let invite = db.get(`antilink_${message.guild.id}`)
if(invite) {
 return message.channel.send(`${emoji.errado}** Este modulo ja está ligado**`)
} else {
  message.channel.send(`${emoji.certo}** Você ligou o antiinvite, agora todos os invites enviado neste servidor serão excluidos**`)
  db.set(`antilink_${message.guild.id}`, true)
  
}
} catch (e) {
  return
}
    break;
    case "host_Fusion":
try {
  let bot = db.get(`antibot_${message.guild.id}`)
  if(bot) {
   return message.channel.send(`${emoji.errado} **Este modulo ja está ligado**`)
  } else {
    message.channel.send(`${emoji.certo}** Você ligou o antibot, agorra todos os bots que entrarem, levaram kick**`)
    db.set(`antibot_${message.guild.id}`, true)

  }
} catch (e) {
  return
}
    break;
    case "carregando_Fusion":
try {
  let captch = db.get(`captcha_${message.guild.id}`)
  if(captch) {
   return message.channel.send(`${emoji.errado} **Este modulo ja está ligado**`)
  } else {
    message.channel.send(`${emoji.certo}** Você ligou o captcha**`)
    db.set(`captcha_${message.guild.id}`, true)

  }
} catch (e) {
  return
}
    break;
    case "b_delete":
    try {
      let fak = db.get(`antifake_${message.guild.id}`)
      if(!fak) {
        return message.channel.send(`${emoji.errado}** Este módulo ja está desligado!**`)
      } else {
    db.delete(`antifake_${message.guild.id}`)
    db.delete(`faketempo_${member.guild.id}`)
 message.channel.send(`${emoji.certo}** Você desligou o antifake**`)
      }
    } catch (e) {
      return
    }
    break;
    case "b_link":
    try {
    let lin = db.get(`antilink_${message.guild.id}`)
    if(!lin) {
      return message.channel.send(`${emoji.errado}** Este módulo ja esta desativado**`)
    } else {
message.channel.send(`${emoji.certo}** Você desligou o antiinvite**`)
  db.delete(`antilink_${message.guild.id}`)
    }
    } catch (e) {
      return
    }
    break;
    case "b_mundo":
    try {
      let bots = db.get(`antibot_${message.guild.id}`) 
      if(!bots) {
        return message.channel.send(`**${emoji.errado} Este modulo ja está desativado**`)
      }
     message.channel.send(`${emoji.certo}** Você desligou o antibot**`)
  db.delete(`antibot_${message.guild.id}`)
    
    } catch (e) {
      return;
    }
break;
case "b_wifi": 
try {
let cap = db.get(`captcha_${message.guild.id}`) 
      if(!cap) {
        return message.channel.send(`**${emoji.errado} Este modulo ja está desativado**`)
      }
     message.channel.send(`${emoji.certo}** Você desligou o captcha**`)
     db.delete(`rCaptcha_${message.guild.id}`)
     db.delete(`ccCaptcha_${message.guild.id}`)
     db.delete(`cCaptcha_${message.guild.id}`)
     db.delete(`captcha_${message.guild.id}`)
} catch (e) {
  return
}
break
  }
})
  }
}