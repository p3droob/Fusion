const Discord = require("discord.js");
const db = require('quick.db')
 
module.exports = {
  name: 'drop',
  aliases: ["dropar"],
  run: async (client, message, args) => {
if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send("Apenas meu desenvolvedor pode usar esse comando!");
   };

    const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`**Um drop especial apareceu!**`)
    .setTimestamp()
    .setFooter(`Créditos: Whale`)
    .addFields(
        {
            name: '⠀⠀⠀⠀⠀',
            value: "O primeiro que reagir em `🎁` vai ganha 50k de flocos ",
        },
    )

const g = await message.channel.send(embed);
    await g.react("🎁")
  var collector = g.createReactionCollector(r => r.user !== client.user.id, { time: 900000 });
  collector.on("collect", (reaction, user) => {
  const member = message.guild.member(user);
  switch (reaction.emoji.name) {
  case "🎁":
  db.add(`flocos_${member.id}`, '50000')
  message.channel.send(`**Parabéns <@${user.id}>**`)

}
})



  }
}