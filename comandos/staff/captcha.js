const Discord = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")
const quote = require("../../utils/quote.js")

module.exports = {
  name: "captcha",
  run: async (client, message, args) => {
    let captcha = db.get(`captcha_${message.guild.id}`) 
    if(captcha) {
      if(!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return error.permissionFor(message)
let channel = message.guild.channels.cache.get(db.get(`cCaptcha_${message.guild.id}`))
if(message.channel.id !== channel.id) {
  return message.channel.send(`${emoji.errado} **${message.author} você só pode executar este comando em <#${channel.id}>**`).then(m => m.delete({timeout: 10000}))
} else {

  let cargo = message.guild.roles.cache.get(db.get(`rCaptcha_${message.guild.id}`))
  if(message.member.roles.cache.has(cargo.id)) return message.channel.send(`${emoji.errado} **${message.author} Você já está verificado**`).then(m => m.delete({timeout: 15000}))

if(message.guild.me.roles.highest.position <= message.member.roles.highest.position) return message.quote("**Não consigo executar este comando pois meu cargo é muito baixo**")

let array = [
  'ako33',
  'kjm0m9l',
  '93ukc',
  'dakdkaw',
  '9193klk',
  'llo2m',
  'pwpfl',
  "damdwa"
];

let arg = array[Math.floor(Math.random() * array.length)]

message.channel.send({embed: {
  description: `**Digite o seguinte codigo para passar pela verificação: \`${arg}\`**`,
  color: "BLACK"
}}).then(msg => {
  msg.delete({timeout: 10000})
  message.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1, time: 10000})
  .on("collect", message => {
    
    message.delete()
    let content = message.content;
    if(arg !== content) {
      return message.channel.send({embed: {
        description: `**${message.author} Parece que você errou, execute o comando novamente!!**`,
        color: "RED"
      }}).then(m => m.delete({timeout: 10000}))
      msg.delete({timeout: 10000})
    } else {
      let embed1 = new Discord.MessageEmbed()
      .setDescription(`**Parabens ${message.author} você passou pelo captcha**`)
      .setColor("GREEN")
      message.channel.send(embed1).then(m => m.delete({timeout: 10000}))
      message.member.roles.add(cargo)

      let canal = client.channels.cache.get(db.get(`ccCaptcha_${message.guild.id}`))
      if(canal) {
const embed = new Discord.MessageEmbed()
.setAuthor(`Captcha ${client.user.username}`, client.user.displayAvatarURL())
.setDescription(`${message.author} Passou pela verificação`)
.setFooter(`Captcha ${message.guild.name}`, message.guild.iconURL())
.setThumbnail(message.author.displayAvatarURL())
.setColor("BLUE")
.setTimestamp()
canal.send(embed)
      } else {
        return
      }
msg.delete({timeout: 10000})
    }
  })
})
  }
    } else {
      return message.quote(`${emoji.errado} **Você deve ligar o captcha e configura-lo**`)
    }
  }
}
