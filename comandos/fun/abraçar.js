 const Discord = require('discord.js');
module.exports ={
  name: "abraçar",
  aliases: ["hug"],
  usage: "abraçar <usuário>",
  descrição: "abrace alguém",
  category: 'fun',
  run: async (client, message, args) => {

var list = [
  'https://imgur.com/NBbhdLN.gif'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.respond('mencione um usuário para você abraçar!!!');
}

message.respond(`${message.author.username} **Deu um abraço no** ${user.username}! :heart:`, {files: [rand]});

}
}