const express = require('express');
const app = express();
app.get("/", (request, response) => {
const ping = new Date()
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); 

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db")
const fs = require('fs')
const weather = require('weather-js')
const xp = require("./utils/xp.js");
const ms = require('ms');
const moment = require("moment")
//handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./comandos/`);

['command', 'event'].forEach(x => require(`./handlers/${x}`)(client));


//prefix
client.on("message", message => {
if(message.author.bot) return;
if(message.content == `<@!812272055457546271>` || message.content === `<@812272055457546271>`) {
const db = require('quick.db');
const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
const embed = new Discord.MessageEmbed()
.setDescription(`**Meu prefixo nesse servidor é \`${prefix}\` digite \`${prefix}help\` para ver minha lista de comandos!**`)
.setColor("#ff0000")
return message.channel.send(embed)
}
});

  
//han
//     fs = require("fs");
//client.commands = new Discord.Collection();
//client.aliases = new Discord.Collection();
client.events = new Discord.Collection();





const mySecret = process.env['TOKEN']



//login
client.login(mySecret)

//blacklist
//client.on("message", message => {
 //const prefix = db.get(`${message.guild.id}.prefix`) || "F!"
//if(!message.content.startsWith(prefix)) return;
//if(!message.member)
//message.member = message.guild.fetchMember(message)

//let blacklist = db.get(`blackList_${message.author.id}`)
//if(blacklist) return message.channel.send(`${message.author} você está em minha blacklist, por isso não pode usar meus comandos!`)
//});
//antiraid
  client.on("guildMemberAdd", async member => {
    let bot = db.get(`antibot_${member.guild.id}`)
    if(bot) {
      if(member.user.bot) {
      await member.kick("Anti Bot Ativado")
      }
    } else {
      return
    }
  })

  client.on("guildMemberAdd", async member => {
    let fake = db.get(`antifake_${member.guild.id}`)
    if(fake) {
  const timeAccount = moment(new Date()).diff(member.user.createdAt, "dias");
  let tempo = db.get(`faketempo_${member.guild.id}`) || 7
  const minimumDays = `${tempo}`

  if (timeAccount < minimumDays) {
    await member.kick(`Anti-fake Ativado`);
  }
    } else {
      return;
    }
});
//av
client.on("message", async message => {
let link = await db.get(`antilink_${message.guild.id}`)
if(link) {
 if(message.channel.type == "dm") return;
  if (!message.member.hasPermission("ADMINISTRATOR")) {
  const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
  if (regex.exec(message.content)) {
    await message.delete()
      await message.channel.send(
        `${emoji.errado} | ${message.author} **O anti-invite está ativado neste servidor!**`
      ).then(m => m.delete({timeout: 10000}))
  } 
  } else {
 return
  }
  } else {
    return
  }
});





//xp local
client.on("message", async message => {
  if(message.author.bot) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
  let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)


  let messages;
  if (messagefetch == 100) messages = 100; //Level 1
  else if (messagefetch == 200) messages = 200; // Level 2
  else if (messagefetch == 300) messages = 300; // Level 3
  else if (messagefetch == 400) messages = 400; // Level 4
  else if (messagefetch == 500) messages = 500; // Level 5
  else if (messagefetch == 600) messages = 600; // Level 6
  else if (messagefetch == 700) messages = 700; // Level 7
  else if (messagefetch == 800) messages = 800; // Level 8
  else if (messagefetch == 900) messages = 900; // Level 9
  else if (messagefetch == 1000) messages = 1000; // Level 10
  else if (messagefetch == 1100) messages = 1100; // Level 11
  else if (messagefetch == 1200) messages = 1200; // Level 12
  else if (messagefetch == 1300) messages = 1300; // Level 13
  else if (messagefetch == 1400) messages = 1400; // Level 14
  else if (messagefetch == 1500) messages = 1500; // Level 15
  else if (messagefetch == 1600) messages = 1600; // Level 16
  else if (messagefetch == 1700) messages = 1700; // Level 17
  else if (messagefetch == 1800) messages = 1800; // Level 18
  else if (messagefetch == 1900) messages = 1900; // Level 19
  else if (messagefetch == 2000) messages = 2000; // Level 20
  else if (messagefetch == 2100) messages = 2100; // Level 21
  else if (messagefetch == 2200) messages = 2200; // Level 22
  else if (messagefetch == 2300) messages = 2300; // Level 23
  else if (messagefetch == 2400) messages = 2400; // Level 24
  else if (messagefetch == 2500) messages = 2500; // Level 25
  else if (messagefetch == 2600) messages = 2600; // Level 26
  else if (messagefetch == 2700) messages = 2700; // Level 27
  else if (messagefetch == 2800) messages = 2800; // Level 28
  else if (messagefetch == 2900) messages = 2900; // Level 29
  else if (messagefetch == 3000) messages = 3000; // Level 30
  else if (messagefetch == 3100) messages = 3100; // Level 31
  else if (messagefetch == 3200) messages = 3200; // Level 32
  else if (messagefetch == 3300) messages = 3300; // Level 33
  else if (messagefetch == 3400) messages = 3400; // Level 34
  else if (messagefetch == 3500) messages = 3500; // Level 35
  else if (messagefetch == 3600) messages = 3600; // Level 36
  else if (messagefetch == 3700) messages = 3700; // Level 37
  else if (messagefetch == 3800) messages = 3800; // Level 38
  else if (messagefetch == 3900) messages = 3900; // Level 39
  else if (messagefetch == 4000) messages = 4000; // Level 40
  else if (messagefetch == 4100) messages = 4100; // Level 41


  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1)
    const level = db.fetch(`level_${message.guild.id}_${message.author.id}`) 
    let user = message.author
    let proxlvl = level + 1
    let xpproxlvl = proxlvl * 100
    let falta = xpproxlvl - messagefetch
    
    let msg3 = `**<:host_Fusion:831121757732601898> | Level Up**\nParabéns ${user}, você acaba de subir para o level ${level}, xp atual: ${messagefetch}! Próximo level em ${falta} de xp.`
      let clup = message.guild.channels.cache.get(db.get(`channelup_${message.guild.id}`)) || message.channel
   clup.send(msg3)
  }
  
 


})
//xp global
client.on("message", async message => {
  if(message.author.bot) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  db.add(`msgglobal_${message.author.id}`, 1)
  let messagefetch = db.fetch(`msgglobal_${message.author.id}`)


  let messages;
 if (messagefetch == 1000) messages = 1000; //Level 1
  else if (messagefetch == 2000) messages = 2000; // Level 2
  else if (messagefetch == 3000) messages = 3000; // Level 3
  else if (messagefetch == 4000) messages = 4000; // Level 4
  else if (messagefetch == 5000) messages = 5000; // Level 5
  else if (messagefetch == 6000) messages = 6000; // Level 6
  else if (messagefetch == 7000) messages = 7000; // Level 7
  else if (messagefetch == 8000) messages = 8000; // Level 8
  else if (messagefetch == 9000) messages = 9000; // Level 9
  else if (messagefetch == 10000) messages = 10000; // Level 10
  else if (messagefetch == 11000) messages = 11000; // Level 11
  else if (messagefetch == 12000) messages = 12000; // Level 12
  else if (messagefetch == 13000) messages = 13000; // Level 13
  else if (messagefetch == 14000) messages = 14000; // Level 14
  else if (messagefetch == 15000) messages = 15000; // Level 15
  else if (messagefetch == 16000) messages = 16000; // Level 16
  else if (messagefetch == 17000) messages = 17000; // Level 17
  else if (messagefetch == 18000) messages = 18000; // Level 18
  else if (messagefetch == 19000) messages = 19000; // Level 19
  else if (messagefetch == 20000) messages = 20000; // Level 20
  else if (messagefetch == 21000) messages = 21000; // Level 21
  else if (messagefetch == 22000) messages = 22000; // Level 22
  else if (messagefetch == 23000) messages = 23000; // Level 23
  else if (messagefetch == 24000) messages = 24000; // Level 24
  else if (messagefetch == 25000) messages = 25000; // Level 25
  else if (messagefetch == 26000) messages = 26000; // Level 26
  else if (messagefetch == 27000) messages = 27000; // Level 27
  else if (messagefetch == 28000) messages = 28000; // Level 28
  else if (messagefetch == 29000) messages = 29000; // Level 29
  else if (messagefetch == 30000) messages = 30000; // Level 30
  else if (messagefetch == 31000) messages = 31000; // Level 31
  else if (messagefetch == 32000) messages = 32000; // Level 32
  else if (messagefetch == 33000) messages = 33000; // Level 33
  else if (messagefetch == 340000) messages = 34000; // Level 34
  else if (messagefetch == 35000) messages = 35000; // Level 35
  else if (messagefetch == 360000) messages = 36000; // Level 36
  else if (messagefetch == 37000) messages = 37000; // Level 37
  else if (messagefetch == 38000) messages = 38000; // Level 38
  else if (messagefetch == 39000) messages = 39000; // Level 39
  else if (messagefetch == 40000) messages = 40000; // Level 40
  else if (messagefetch == 41000) messages = 41000; // Level 41


  if (!isNaN(messages)) {
    db.add(`lvlglobal_${message.author.id}`, 1)
    const level = db.fetch(`lvlglobal_${message.author.id}`) 
    let user = message.author
    let proxlvl = level + 1;
    let xpproxlvl = proxlvl * 1000;
    let falta = xpproxlvl - messagefetch;
    let clup = message.guild.channels.cache.get("837486867292618864")
clup.send(`**<:b_mundo:835235915319869451> | Level Up Global**\nParabéns ${message.author}, você acaba de subir para o level ${level}!`)
  }
})