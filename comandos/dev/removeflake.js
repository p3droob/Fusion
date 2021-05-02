const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: 'removeflake',
  aliases: ["removerflocos"],
  description: 'remove flocos',
rum: async (bot, message, args) => {
    if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send(`${message.author} apenas meu desenvolvedor pode usar esse comando, desculpa!`
    );
    };

    let user = message.mentions.users.first();

    if (!user) {
        return message.channel.send(` ${message.author}, você precisa mencionar um usuário para remover os flocos!`);
    };

    if (isNaN(args[1])) {
        return message.channel.send(` ${message.author}, você precisa colocar um número valido!`);
    };

    db.subtract(`flocos_${user.id}`, args[1]);
    let bal = await db.fetch(`flocos_${user.id}`);

    let moneyEmbed = new Discord.MessageEmbed()
    .setTitle(":snowflake: **|** flocos foram removidos!")
    .setColor("#00001")
    .setDescription(`Foi removido **${args[1]} flocos** para ${user}!\n\n:snowflake: Flocos Atuais: **${bal}**`)
    .setFooter(`Flocos foram removidos!`);
    message.channel.send(moneyEmbed);
}
}