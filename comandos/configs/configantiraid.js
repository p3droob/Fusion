const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const emoji = require("../../utils/emojis.js")
const quote = require("../../utils/quote.js")

module.exports = {
  name: "configantiraid",
  aliases: ["configdefesa"],
  description: "configura as opções de antiraid",
  run: async (client, message, args) => {
if(!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return error.permissionFor(message)
if(!message.member.hasPermission("ADMINISTRATOR")) return message.quote(`** Você precisa da permissão de \`Administrador\` para realizar este comando**`)

const embed = new MessageEmbed()
.setTitle("Configuraçoes de Antiraid")
.setDescription("** Para configurar o antiraid reaja ao emoji indicado de cada categoria\n\nTempo | Anti-Fake  -> <:suporte_Fusion:824603708783460422>\n\nCargo | Captcha -> <a:carregando_Fusion:824602024314273792>\nCanal onde será necessário o captcha -> <a:download_Fusion:826103385623101470>\nLogs Captcha | <:canal_Fusion:831537857554284604>**")
.setThumbnail(message.guild.iconURL())
.setColor("#ff0000")
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())

var msg = await message.quote(embed)
await msg.react("<:suporte_Fusion:824603708783460422>")
await msg.react("<a:carregando_Fusion:824602024314273792>")
await msg.react("<a:download_Fusion:826103385623101470>")
await msg.react("<:canal_Fusion:831537857554284604>")

let filtro = (reaction, user) => message.author.id === user.id;
let coletor = msg.createReactionCollector(filtro, {
  time: 90000
})

coletor.on("collect", (reaction, user) => {
  switch (reaction.emoji.name) {
case "suporte_Fusion":
let fake = db.get(`antifake_${message.guild.id}`)
if(fake) {
return message.channel.send("**Qual o tempo (em dias )que você deseja que o bot bloqueie?**").then(msg => {
  message.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1})
  .on("collect", message => {
    let tempo = message.content;
    try {
      let temp = db.get(`faketempo_${message.guild.id}`)
      if(tempo === temp) {
      return message.quote(`${emoji.errado}** Você ja setou este tempo!**`)
      } else {
    if(isNaN(tempo)) return error.isNaN(message)
    if(tempo.length > 6) return error.lengthNumber(message)
    message.quote(`${emoji.certo} **Você setou o tempo do anti-fake para ${tempo} Dias**`)

    db.set(`faketempo_${message.guild.id}`, tempo)
      }
    } catch (e) {
      return
    }
  })
})
} else {
  return message.quote(`**Você não ligou o Anti-Fake**`)
}
break;
case "carregando_Fusion":
message.channel.send("** Me dê um cargo para setar de verificação**").then(msg => {
  message.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1})
  .on("collect", message => {
let captcha = db.get(`captcha_${message.guild.id}`)
if(captcha) {
  let cargo = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
if(!cargo) return message.channel.send(` **Me dê um cargo para setar**`)

let role = db.get(`rCaptcha_${message.guild.id}`)
if(cargo.id === role) {
  return message.quote(`**Este cargo ja foi setado**`)
} else {
if (message.guild.me.roles.highest.position <= cargo.position) return message.quote("**Não consigo executar este comando pois meu cargo é muito baixo**")

db.set(`rCaptcha_${message.guild.id}`, cargo.id)
message.quote(`**${emoji.certo} Cargo ${cargo.name} Setado como cargo de verificação**`)
}

} else {
  return message.channel.send(`**Este modulo está desligado**`)
}
  })
})
break;
case "download_Fusion": 
let Captcha = db.get(`captcha_${message.guild.id}`)
if(Captcha) {
message.channel.send(" **Diga um canal para ser o canal de verificação**").then(msg => {
  message.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1})
  .on("collect", message => {
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if(!channel) return message.quote(`${emoji.errado} **Me dê um canal para setar**`)

if(!channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return message.quote(`${emoji.errado} **Eu não possuo permissão de falar neste canal**`)

try {
let canal = db.get(`cCaptcha_${message.guild.id}`)
if(canal === channel.id) {
  return message.quote(`**${emoji.errado} Este canal ja foi setado**`)
} else {
  db.set(`cCaptcha_${message.guild.id}`, channel.id)
  message.quote(`${emoji.certo} **Canal <#${channel.id}> Setado como canal de verificação**`)
}
} catch (e) {
  return
}
  })
})

} else {
  return message.channel.send(`${emoji.errado} **Você não ligou o captcha**`)
}
break;
case "canal_Fusion":
let aptcha = db.get(`captcha_${message.guild.id}`)
if(aptcha) {
message.channel.send("<a:carregando_Fusion:824602024314273792> **Me dê um canal para setar de logs captcha**").then(msg => {
  message.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1})
  .on("collect", message => {
let chanel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if(!chanel) return message.quote(`${emoji.errado} **Me dê um canal para setar**`)
if(!chanel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return message.quote(`${emoji.errado} **Eu não possuo permissão de falar neste canal**`)

try{
let cana = db.get(`ccCaptcha_${message.guild.id}`)
if(cana === chanel.id) {
  return message.quote(`**${emoji.errado} Este canal ja foi setado**`)
} else {
  db.set(`ccCaptcha_${message.guild.id}`, chanel.id)
  message.quote(`${emoji.certo} **Canal <#${chanel.id}> Setado como canal de logs captcha**`)
}
} catch (e) {
  return
}
  })
})

} else {
  return message.channel.send(`${emoji.errado} **Você não ligou o captcha**`)
}
break;

  }
})

  }
}