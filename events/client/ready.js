const Discord = require("discord.js")
module.exports = async (client, message) => {
let db = await client.db.ref('Users').once('value').then(r => r.val());
let array = Array.from(Object.keys(db))
let arr = [];
array.forEach(e => {
let verify1 = db[e].games;
if (!verify1) return;
let verify2 = verify1.pesca;
if (!verify2) return;
let verify3 = verify2.singleplayer;
if (!verify3) return;
client.db.ref(`Users/${e}/games/pesca/singleplayer`).remove()
})

setInterval(async () => {
  array.forEach(async e => {
let pegar1 = db[e].vip;
if (pegar1 !== true) return;
let pegar2 = await client.db.ref(`Users/${e}/flocos`).once('value').then(r => r.val());
client.db.ref(`Users/${e}`).update({
  flocos: Number(pegar2) + 5
})
})
}, 60000)

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
      .setFooter(`${client.user.username} aqui novamente`)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      channel.send(acordei)
}