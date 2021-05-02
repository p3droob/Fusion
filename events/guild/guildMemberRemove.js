const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (client, member) => {

 let canal = await member.guild.channels.cache.get(db.get(`cLev_${member.guild.id}`))
  if(canal) {
  let msg = await db.get(`mLev_${member.guild.id}`) || `${member.user.username} Kitou do servidor (mensagem automatica, use <prefix>configserver para altera-la)`
  
   canal.send(msg.replace("{member:username}", `${member.user.username}`).replace("{member:id}", `${member.id}`).replace("{member:count}", `${member.guild.memberCount}`).replace("{member:mention}", `${member}`).replace("{guild:name}", `${member.guild.name}`))
  } else {
    return;
  }

  let guild = await client.guilds.cache.get("780618665241739285");
  let channel = await client.channels.cache.get("797929415421591602");
  if (guild != member.guild) {
    return;
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`Adeus!`)
      .setDescription(`**${member.user.username}**, saiu do servidor!`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("")
      .setTimestamp();

    channel.send(embed);
  }


  
}