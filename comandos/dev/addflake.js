const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "addflake",
  aliases: ["addflocos", "adicionarflocos"],
  run: async (bot, message, args) => {
   if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send("Apenas meu desenvolvedor pode usar esse comando!");
   };

    let user = message.mentions.users.first();

    let args1 = args[1].replace('k', '000').replace('m', '000000').replace('kk', '000000')

    if (!user) {
        return message.channel.send(` ${message.author}, Você precisa mencionar um usuário para adicionar os flocos`);
    };

    if (isNaN(args1.replace('k', '000').replace('m', '000000').replace('kk', '000000'))) {
        return message.channel.send(` ${message.author}, você precisa colocar um número valido!`);
    };

    db.add(`flocos_${user.id}`, args1.replace('k', '000').replace('m', '000000').replace('kk', '000000'));
    let bal = await db.fetch(`flocos_${user.id}`);

    let moneyEmbed = new Discord.MessageEmbed()
    .setTitle(":snowflake:")
    .setColor("#ff0000")
    .setDescription(`Foi adicionado **${args1}** flocos para ${user}!\n\n:snowflake: Flocos atuais: **${bal} flocos**`)
    .setFooter(`Comando requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
    message.channel.send(moneyEmbed);
    }
  }