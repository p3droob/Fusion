const Discord = require("discord.js");
const db = require('quick.db')
 
module.exports = {
  name: 'drop2',
  aliases: ["dropar2"],
  run: async (client, message, args) => {
if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send("Apenas meu desenvolvedor pode usar esse comando!");
   };

    const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`**Um drop especial apareceu!**`)
    .setTimestamp()
    .setFooter(`Créditos: Pit`)
    .addFields(
        {
            name: '⠀⠀⠀⠀⠀',
            value: "O primeiro que falar a palavra `Fusion` vai ganha 100k de flocos ",
        },
    )

const g = await message.channel.send(embed);
    await g.react("🎁")
const filter = m => m.content.includes('Fusion');
const collector = message.channel.createMessageCollector(filter);

collector.on('collect', m => {
  db.add(`flocos_${user.id}`, '100000')
	console.log(`Collected ${m.content}`);
});

collector.on('end', collected => {
	console.log(`Collected ${collected.size} items`);
});



  }
}