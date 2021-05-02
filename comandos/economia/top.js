const Discord = require('discord.js')
const db = require('quick.db')
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "top",
    aliases: ["ranking"],
    description: "mostra o ranking",
  run: async (client, message, args) => {


    const embed = new Discord.MessageEmbed()
    .setDescription(`**TOP 10 RANKS GLOBAL**`)
   .setFooter("Escreva tudo em minúsculo", message.author.displayAvatarURL({format: "png"}))
   .setThumbnail('https://network.grupoabril.com.br/wp-content/uploads/sites/4/2019/06/seis-universidades-brasileiras-caem-de-posic3a7c3a3o-no-ranking-de-melhores-do-mundo-facebook.png')
    .setColor("#ff58c3")


  if(!args[0]) return message.channel.send(embed) 

    if (args[0] == 'flocos') {
    
             let money = db.all().filter(data => data.ID.startsWith(`flocos_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor("#ff58c3")
                .setFooter("Não tem nada aqui!")
            return message.channel.send(noEmbed)
        };
        
        money.length = 10;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            
            let user = client.users.cache.get(money[i].ID.split('_')[2])
            finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : `${user} `}** - ${money[i].data}\n`;
        };
      let bal = db.fetch(`flocos_${message.author.id}`)
       if(bal === null) bal = '0'
        const embed = new MessageEmbed()
            .setTitle(`**:star: __*GLOBAL* | TOP.10 FLOCOS __**`)
            .setColor("#ff0000")
            .setDescription(finalLb)
            .setFooter(`Seus flocos » ${bal} | Trabalhe mais e suba de Rank!`, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);

  }
  if (args[0] == 'reps') {
    
             let rep = db.all().filter(data => data.ID.startsWith(`reps_`)).sort((a, b) => b.data - a.data);
        if (!rep.length) {
            let noEmbed = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor("#ff58c3")
                .setFooter("Não tem nada aqui!")
            return message.channel.send(noEmbed)
        };
        
        rep.length = 10;
        var finalLbrep = "";
        for (var i in rep) {
            if (rep[i].data === null) rep[i].data = 0
            let user = client.users.cache.get(rep[i].ID.split('_')[2])
            finalLbrep += `**${rep.indexOf(rep[i]) + 1}. ${client.users.cache.get(rep[i].ID.split('_')[1]) ? client.users.cache.get(rep[i].ID.split('_')[1]).tag : `${user}`}** - ${rep[i].data}\n`;
        };
      let reps = db.fetch(`reps_${message.author.id}`)
       if(reps === null) reps = '0'
        const toprep = new MessageEmbed()
            .setTitle(`**:star: __*GLOBAL* | TOP.10 REPS __**`)
            .setColor("#ff0000")
            .setDescription(finalLbrep)
            .setTimestamp()
        message.channel.send(toprep);

  }

}}