const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
  name:"reportabug",
  aliases:["bug", "rbug", "reportbug"],
  usage: 'reportarbug <bug>',
  description: 'reporte um bug',
  run: async (client, message, args) => {
    
 const reporte = args.join(" ")
if(!reporte) return message.channel.send(`${message.author} você deve digitar o bug`) 

const embed = new Discord.MessageEmbed()

.setTitle("Novo bug")
.setDescription(`O usuário  ${message.author.id} \nReportou um bug no servidor ${message.guild.name}, id:${message.guild.id} \nEle reportou **${reporte}**`)
.setFooter("Espero que conserte")
.setColor("#ff0000")

let canal = client.channels.cache.get("837030497066287234");
const amount = 1;
db.add(`bugs_${message.author}`, amount);
let totalbugs = db.fetch(`bugs_${message.author}`);
canal.send(embed)
message.channel.send(`${message.author} o bug \`\`${reporte}\`\` foi reportado com sucesso! Até agora você reportou ${totalbugs} bugs!`)
}
}