const Discord = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")
const quote = require("../../utils/quote.js")

module.exports = {
  name: "configserver",
  aliases: ["configservidor", "confugurarservidor"],
  description: "Configura a entrada/saída do servidor", 
  usage: "configserver",
  run: async (client, message, args, settings) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Você precisa ter a permissão de `Gerenciar Servidor` para executar este comando**")

const embed = new Discord.MessageEmbed()
.setTitle(`${emoji.configs}Configurações de ${message.guild.name}`)
.setDescription("> Para configurar cada opção reaja ao emoji indicado\n\n> **Welcome**\n**<a:download_Fusion:826103385623101470> | `Canal`**\n**<:b_delete:835233267640434750> | `Mensagem`**\n**<:b_link:835234866878087179> | `Autorole`**\n\n> **Saida**\n**<:b_wifi:835236250558005269> | `Canal`**\n**<:b_mundo:835235915319869451> | `Mensagem`**\n\n> **Desativar**\n <:rei_Fusion:831121925820121118> **| `Entrada`**\n** <:host_Fusion:831121757732601898> | `Saida`**\n**<:suporte_Fusion:824603708783460422> | `Autorole`**")
.setColor("#ff0000")
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
.setThumbnail(message.guild.iconURL())
var msg = await message.quote(embed)
await msg.react("<a:download_Fusion:826103385623101470>")//Wc
await msg.react("<:b_delete:835233267640434750>")//Wm
await msg.react("<:b_link:835234866878087179>")//auto
await msg.react("<:b_wifi:835236250558005269>")//Bc
await msg.react("<:b_mundo:835235915319869451>")//Bm
await msg.react("<:rei_Fusion:831121925820121118>")//
await msg.react("<:host_Fusion:831121757732601898>")//
await msg.react("<:suporte_Fusion:824603708783460422>")//

const filter = (reaction, user) => user.id === message.author.id;
    var collector = msg.createReactionCollector(filter, {
      time: 900000
    });
    collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
      case "download_Fusion":
    message.channel.send("** Mencione um canal a ser setado**").then(msg => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", message => {
          msg.delete()
          let channel = message.mentions.channels.first()
//mine
 if(!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
        return message.channel.send("**Eu não possuo permissão de `Enviar Mensagens` neste canal**");
       } 

    try {
      let a = db.get(`welcome_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send(`**${emoji.errado} Este canal ja foi setado**`); 
     
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Canal de entrada setado neste Canal!**");
      db.set(`welcome_${message.guild.id}`, channel.id)
        message.channel.send(
          `**${emoji.configs} | Canal de entrada setado em ${channel} com sucesso!**`
        );
      }
      
    } catch (e) {
      return message.channel.send(
        `**Error - ${e.message}`);
    }
        })
    })
      break;
      case "b_wifi":
     message.channel.send("**<a:carregando_Fusion:824602024314273792> Mencione um canal a ser setado**").then(msg => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", message => {
          msg.delete()
    let channel =
      message.mentions.channels.first()

      if(!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
        return message.channel.send(`**${emoji.errado} não possuo a permissão de \`enviar mensagens\` neste canal**`);
       } 

    try {
      let a = db.get(`bye_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send(`**${emoji.errado} Este canal ja foi setado**`); 
     
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Canal de saída setado neste canal!**");
        db.set(`bye_${message.guild.id}`, channel.id);

        message.channel.send(
          `**Canal de saída setado em ${channel}**`
        );
      }
      
 
    } catch (e) {
      return message.channel.send(`${e.message}`);
    }
        })
     })
      break;
    case "b_delete":
message.channel.send("**<a:carregando_Fusion:824602024314273792> | Diga uma mensagem de Entrada**").then(msg => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", message => {
          msg.delete()

      let msg2 = message.content;

    try {
      let a = db.get(`welmsg_${message.guild.id}`)
       if(msg2 === a) {
       return message.channel.send(`**${emoji.errado} esta mensagem já foi setada**`);
       
      } else {
        
        db.set(`welmsg_${message.guild.id}`, msg2);
        const wel = new Discord.MessageEmbed()
        .addField("Nova mensagem setada", `\`${msg2}\``)
        .setAuthor("Mensagem de entrada", message.guild.iconURL())
.setColor("GREEN")
.setFooter(`Setado por ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(wel);
      }
      
 
    } catch (e) {
      return message.channel.send(`Error - ${e.message}`)
    }

        })
})
    break;
  case "b_mundo":
message.channel.send("**<a:carregando_Fusion:824602024314273792> Mê de uma mensagem de Saída**").then(msg1 => {
      let collector = message.channel.createMessageCollector(m => 
        m.author.id === message.author.id, { max: 1 })
        .on("collect", message => {
          msg1.delete()
    let msg = message.content;

    try {
      let a = db.get(`byemsg_${message.guild.id}`);

      if (msg === a) {
        return message.channel.send(`**${emoji.errado} esta mensagem já foi setada**`); 
     
      } else {
       
        db.set(`byemsg_${message.guild.id}`, msg);

    const embed1 = new Discord.MessageEmbed()
    .setAuthor("Mensagem de Saída", message.guild.iconURL())
    .addField("Nova mensagem de saída setada", `\`${msg}\``)
    .setColor("GREEN")
        message.channel.send(embed1);
      }
      
 
    } catch (e) {
      return message.channel.send(`Error- ${e.message}`
      );
    }

        })
})
  break;
  case "rei_Fusion":
db.delete(`welcome_${message.guild.id}`)
db.delete(`welmsg_${message.guild.id}`)
message.channel.send("** Sistema de Entrada Desativado**")
  break;
  case "host_Fusion":
db.delete(`bye_${message.guild.id}`)
db.delete(`byemsg_${message.guild.id}`)
message.channel.send("** Sistema de Saída Desativado**")
  break;
    case "b_link":
    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("**Eu preciso da permissão de `Gerenciar Cargos` para realizar este comando**")
    message.channel.send("** Me envie um cargo para setar como Autorole**").then(msg => {
      let collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1})
      .on("collect", message => {
        msg.delete()
        let role =
      message.mentions.roles.first() 

    if (!role)
      return message.channel.send("**Mencione um Cargo**")

    if(message.guild.me.roles.highest.position <= role.position) return message.channel.send("** Eu não consigo adicionar este cargo a novos membros pois ele está acima do meu cargo mais importante!**")
    try {
      let a = db.get(`autorole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send("** Esta role já foi setada**"); 
     

      } else {
        
        db.set(`autorole_${message.guild.id}`, role.id);
       const autrole = new Discord.MessageEmbed()
       .setAuthor("Autorole", message.guild.iconURL())
       .setDescription(`** Autorole setado, cargo do autorole: ${role}**`)
       .setColor("GREEN")
       .setFooter(`Autorole Setado por`, message.author.displayAvatarURL())
        message.channel.send(autrole);
      }
      
 
    } catch (e) {
      return message.channel.send(`Error- ${e.message}`);
    }

      })
    })
    break;
    case "suporte_Fusion":
  db.delete(`autorole_${message.guild.id}`)
  message.channel.send(" **Sistema de Autorole Desativado**")
    break;
      }
    });
  collector.on("end", () => {
      msg.delete({timeout: 90000}).catch(console.error)
    })

  }
}