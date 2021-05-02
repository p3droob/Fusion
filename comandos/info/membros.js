const Discord = require("discord.js");

module.exports = {
  name: 'membros',
  aliases: ["members"],
  usage: 'members',
  description: 'mostra a quantidade de membros no servidor',
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`Quantidade de membros no servidor:`)
    .setTimestamp()
    .setFooter(`Comando feito por: ${message.author.username}`)
    .addFields(
        {
            name: 'Membros',
             value: `**${message.guild.memberCount}!** membros.`,
            inline: true
        }
    )
    message.channel.send(embed);
}
}