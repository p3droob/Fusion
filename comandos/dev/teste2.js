const { MessageEmbed } = require("discord.js")
const moment = require('moment-timezone')
const meuSet = new Set();
module.exports = {
    name: "teste2",
  category: 'dev',
    run: async (client, message, args) => {
const db = await client.db.ref(`Users`).once('value');
    const array = Object.keys(db.val());
    
    array.forEach((e) => { 
        let infoMembro = {
            id: `${e}`, flocos: db.val()[e].flocos || 0
        };
        meuSet.add(infoMembro)
    });

     let pe = Array.from(meuSet);
     let xy = pe.sort(function (a, b) {
         if (a.flocos < b.flocos) {
           return 1;
         }
         if (a.flocos > b.flocos) {
           return -1;
         }
         return 0;
     });
     let suaPosicao;
     xy.forEach(async function (membro, indice){
         if (membro.id == message.author.id) {
             suaPosicao = `${indice+1}`
         }
     })
     let x = [];
 

     
     const maxPerPage = 10;
let queue = Array.from(xy);
const pages = Math.ceil(queue.length / maxPerPage);

let page = 0;
const embed = new MessageEmbed()
.setTitle('TOP')
.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1 ) + page * maxPerPage}. ${client.users.cache.get(e.id).tag} - ${e.flocos}`).join('\n'))
.setFooter('Você está em #' + suaPosicao + ' lugar no ranking!')
var msg = await message.channel.send(embed)
await msg.react("⬅️")
await msg.react("➡️")

let filtro = (reaction, user) => user.id === message.author.id;

let coletor = msg.createReactionCollector(filtro, {
  time: 90000, cooldown: 500
})

coletor.on("collect", async (reaction, user) => {
  switch (reaction.emoji.name) {
    case "⬅️":
   page--
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. ${client.users.cache.get(e.id)?client.users.cache.get(e.id).tag : "usuário desconhecido"} - ${e.flocos}`))
   msg.edit(embed)
   reaction.users.remove(user)
    break;
    case "➡️":
    page++
embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. ${client.users.cache.get(e.id)?client.users.cache.get(e.id).tag : "usuário desconhecido"} - ${e.flocos}`))
    msg.edit(embed)
    reaction.users.remove(user)
    break;
  }
})
     meuSet.clear();
}
}