const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (client, member) => {

 let canal = await member.guild.channels.cache.get(db.get(`welcome_${member.guild.id}`)) 
    if (canal) {
        let msg2 = await db.get(`welmsg_${member.guild.id}`) || `${member.user.username} seja bem-vindo ao ${message.guild.name}! **(mensagem automática, se deseja alterá-la use ${prefix}configserver`
          canal.send(
              msg2.replace("{member:mention}", `${member}`).replace("{member:username}", `${member.user.username}`).replace("{member:count}", `${member.guild.memberCount}`
        ).replace("{member:id}", `${member.id}`).replace("{guild:name}", `${member.guild.name}`))
    } else {
        return;
    }

     let role = await member.guild.roles.cache.get(db.get(`autorole_${member.guild.id}`))
  if(!role) {
    return
  } else{
member.roles.add(role.id)
  }

  
  let guild = await client.guilds.cache.get("");
  let channel = await client.channels.cache.get("");
  if (guild != member.guild) {
    return;
   } else {
      let welcome = await new Discord.MessageEmbed()
      .setColor("BLACK")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`<a:coroa:802935917551288380> Bem-vindo(a)!`)
      .setDescription(`<a:wel1:800570475188584498><a:wel2:800570498589261894> **${member.user.username}**, ao servidor **${guild.name}**! espero que você goste deste servidor!! Sabia que você é o **${member.guild.memberCount}** membro? Muito obrigado por estar aqui conosco!<a:preto_knt_buuh:780946481350705172>`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter(`${guild.name}`)
      .setTimestamp();

    channel.send(`${member.user}`, welcome);
  }

  
}