const Discord = require('discord.js')
const moment = require('moment')
moment.locale("pt-br")
const quote = require("../../utils/quote.js")
const error = require("../../utils/errors.js")

module.exports = {
  name: "userinfo",
  aliases: ['useri', 'uinfo', 'ui'],
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)

    let user = message.mentions.users.first() || await client.users.cache.get(args[0]) || message.author;



    if (user.presence.status === "dnd") user.presence.status = "Não pertube";
    if (user.presence.status === "idle") user.presence.status = "Ausente";
    if (user.presence.status === "offline") user.presence.status = "Offline";
    if (user.presence.status === "online") user.presence.status = "Online";

    function game() {
      let game;
      if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
      else if (user.presence.activities.length < 1) game = "Nenhum";
      return game;
    }

    let x = Date.now() - user.createdAt;
    let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
    let created = Math.floor(x / 86400000);
    let joined = Math.floor(y / 86400000);

    const member = message.guild.member(user);
    let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "Nenhum";

    let createdate = moment.utc(user.createdAt).format("DD/MM/YYYY");
    let joindate = moment.utc(member.joinedAt).format("DD/MM/YYYY");
    let status = user.presence.status;
    let avatar = user.avatarURL({ size: 2048 });
    let verify = user.verified

      if(!user) {
const embed1 = new Discord.MessageEmbed()
      .setTitle(`UserInfo de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#ffffff")
      .addField("Nick:", `**${user.tag}**`, true)
      .addField("Meu ID:", `**${user.id}**`, true)
      .addField("Status:", `**${status}**`, true)
      .addField("Conta Criada em:", `**${createdate} (${moment(user.createdAt, "YYYYMMDD").fromNow()})**`, true)
      .addField("Entrou em:", `**${joindate} (${moment(member.joinedAt, "YYYYMMDD").fromNow()})**`, true)
      .setFooter(` | Comando requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

    return message.quote(embed1)
  }

    const embed = new Discord.MessageEmbed()
      .setTitle(`UserInfo de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#ffffff")
      .addField("Nick:", `**${user.tag}**`, true)
      .addField("Meu ID:", `**${user.id}**`, true)
      .addField("Status:", `**${status}**`, true)
      .addField("Conta Criada em:", `**${createdate} (${moment(user.createdAt, "YYYYMMDD").fromNow()})**`, true)
      
      .addField("Entrou em:", `**${joindate} (${moment(member.joinedAt, "YYYYMMDD").fromNow()})**`, true)
      .setFooter(` | Comando requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

    message.quote(embed)
  }
}