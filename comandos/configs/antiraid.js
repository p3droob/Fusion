const Discord = require("discord.js")
const db = require("quick.db")
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: "antiraid",
  aliases: ["defesa", "antiraiding"],
  description: "Use para proteger seu servidor!",
  category: 'configs',
  run: async (client, message, args) => {
if(!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return error.permissionFor(message)
if(!message.member.hasPermission("ADMINISTRATOR")) return message.respond(`**${emoji.errado} Você precisa da permissão de \`administrator\` para realizar este comando!**`)

const embed = new Discord.MessageEmbed()
.setTitle(`AntiRaid`)
.setDescription("Para realizar a configuração do antiraid clique no emoji que indica cada categoria:\n\n**Ativar**\n**<a:download_Fusion:826103385623101470> <a:setaFusion:816816386843738162> `Anti-Invite`**\n**<:host_Fusion:831121757732601898> <a:setaFusion:816816386843738162> `Anti-Bot`**\n\n\n**Desativar**\n\n**<:b_link:835234866878087179> <a:setaFusion:816816386843738162> `Anti-Invite`**\n**<:b_mundo:835235915319869451> <a:setaFusion:816816386843738162> `Anti-Bot`**")
.setThumbnail(message.guild.iconURL())
.setColor("BLACK")
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())

var msg = await message.respond(embed)
await msg.react("<a:download_Fusion:826103385623101470>")
await msg.react("<:host_Fusion:831121757732601898>")
await msg.react("<:b_link:835234866878087179>")
await msg.react("<:b_mundo:835235915319869451>")
let filtro = (reaction, user) => message.author.id === user.id;
let coletor = msg.createReactionCollector(filtro, {
  time: 90000
})
coletor.on("collect", async (reaction, user) => {
  switch (reaction.emoji.name) {
    case "download_Fusion":
try {
let invite = await client.db.ref(`Guilds/${message.guild.id}/sistems/antiinvite`).once('value').then(r => r.val());
if(invite) {
 return message.channel.send(`${emoji.errado}** Este módulo já está ligado**`)
} else {
  message.channel.send(`${emoji.certo}** Você ligou o antiinvite, agora todos os convites enviados neste servidor serão excluidos**`)
  client.db.ref(`Guilds/${message.guild.id}/sistems`).update({
    antiinvite: true
  })
  
}
} catch (e) {
  return
}
    break;
    case "host_Fusion":
try {
  let bot = await client.db.ref(`Guilds/${message.guild.id}/sistems/antibot`).once('value').then(r => r.val());
  if(bot) {
   return message.channel.send(`${emoji.errado} **Este módulo já está ligado**`)
  } else {
    message.channel.send(`${emoji.certo}** Você ligou o antibot, agora todos os bots que entrarem, serão removidos!**`)
    client.db.ref(`Guilds/${message.guild.id}/sistems`).update({
    antibot: true
  })
  }
} catch (e) {
  return
}
    break;
    case "b_link":
    try {
    let lin = await client.db.ref(`Guilds/${message.guild.id}/sistems/antiinvite`).once('value').then(r => r.val());
    if(!lin) {
      return message.channel.send(`${emoji.errado}** Este módulo já esta desativado**`)
    } else {
message.channel.send(`${emoji.certo}** Você desligou o antiinvite**`)
  client.db.ref(`Guilds/${message.guild.id}/sistems/antiinvite`).remove()
    }
    } catch (e) {
      return
    }
    break;
    case "b_mundo":
    try {
      let bots = await client.db.ref(`Guilds/${message.guild.id}/sistems/antibot`).once('value').then(r => r.val());
      if(!bots) {
        return message.channel.send(`**${emoji.errado} Este modulo ja está desativado**`)
      }
     message.channel.send(`${emoji.certo}** Você desligou o antibot**`)
  client.db.ref(`Guilds/${message.guild.id}/sistems/antibot`).remove()
    
    } catch (e) {
      return;
    }
break;

  }
})
  }
}