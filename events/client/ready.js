const Discord = require("discord.js")
module.exports = (client, message) => {

let activities = [
      `Utilize <prefixo>help para obter ajuda`,
      `Estou em ${client.guilds.cache.size} servidores!`,
      `${client.channels.cache.size} canais!`,
      `Cuido de ${client.users.cache.size} usuários!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
      }), 1000 * 60); 
  client.user
      .setStatus("online")
     .catch(console.error);
console.log(`${client.user.username} Está pronto!`)

      let channel = client.channels.cache.get("824611809403207721")
      const acordei = new Discord.MessageEmbed()
      .setTitle(`Acabei de Reinciar`)
      .addField("Meus Status", `Ping: ${Math.round(client.ws.ping)}\nServidores: ${client.guilds.cache.size}\nUsuarios: ${client.users.cache.size}`)
      .setFooter(`${client.user.username} Acordei novamente`)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      channel.send(acordei)

}