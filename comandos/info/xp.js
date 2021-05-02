const Discord = require('discord.js')
const db = require('quick.db');
const quote = require("../../utils/quote.js")
module.exports = {
    name: "xp",
    aliases: ["xpinfo", "rank", "level"],
    usage: 'level <usuário>',
    description: 'mostra o level de alguém',
    run: async (client, message, args) => {

let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
//localevelfetch
    let level1 = db.fetch(`level_${message.guild.id}_${user.id}`) || 0;
  let message1 = db.fetch(`messages_${message.guild.id}_${user.id}`) || 0;
    let proxlvl1 = level1 + 1
    let xpproxlvl1 = proxlvl1 * 100
    let falta1 = xpproxlvl1 - message1
//global
let level2 = db.fetch(`lvlglobal_${user.id}`) || 0;
  let message2 = db.fetch(`msgglobal_${user.id}`) || 0;
    let proxlvl2 = level2 + 1
    let xpproxlvl2 = proxlvl2 * 1000
    let falta2 = xpproxlvl2 - message2

const embed = new Discord.MessageEmbed()
.setColor('#00ff0c')
.setTitle(`Informações de level`)
.setAuthor(`Level de ${user.username}`)
.setDescription(`**🗺️ |Informações Locais**\n\nLevel: ${level1}\nXp: ${message1}\nXp necessário para o próximo level: ${falta1}\n\n**<:b_mundo:835235915319869451> | Informações Globais**\n\nLevel: ${level2}\nXp: ${message2}\nXp necessário para o próximo level: ${falta2}`)
.setFooter(`Continue interagindo para subir de level!`)
message.quote(embed)
    }
}