const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
const quote = require("../../utils/quote.js")

module.exports = {
  name: 'sobremim',
  aliases: ['aboutme'],
  usage: 'sobremim <texto>',
  run: async (client, message, args) => {
    const aboutme = args.join(' ');
    const prefix = db.get(`${message.guild.id}.prefix`) || "F!";
    const aboutmeEmbed = new MessageEmbed()
    .setColor('RED')
    .setTitle('ℹ | `f!aboutme`')
    .setDescription('não altere essa mensagem')
    .addField("Alterar o Sobre Mim", "`f!aboutme Olá !`")
    .addField("ℹ Aliases:", "`sobremim`")
    .setFooter(`• Autor: ${message.author.tag} - Social`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));
    if (!aboutme) return message.reply(`siga o exemplo a seguir:\n${prefix}sobremim Olá eu sou o Fusion!`);

    const user = message.author;
    db.set(`aboutme_${user.id}`, aboutme);


    message.quote(`sua mensagem de perfil foi alterada com sucesso para \`${aboutme}\`, use ${prefix}perfil para visualizar sua nova mensagem!`);
  },
};