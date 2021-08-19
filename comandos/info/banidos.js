const { MessageEmbed, DiscordAPIError } = require("discord.js")
const cooldowns = {}
const ms = require("ms")

module.exports = {
  name: "banidos",
  aliases: ["listban", "list-ban", "banimentos", 'bans'],
  category: 'info',
  run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.respond(`Você não possui permissão de \`Administrador\` bobão!`)
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.respond(`Eu não possuo permissão de \`Administrador\`!`)
   const bytokyo = message.guild.fetchBans()
   const tokyo_color = "BLACK"
   const tokyo_d = (await bytokyo).map((tokyo) => tokyo.user.tag).join("\n")  || "\`\`\`Ninguém foi banido\`\`\`"
    const bytokyo2 = new MessageEmbed()
    .setTitle('<:users:856979227412004944> Lista de banidos')
    .setDescription(tokyo_d)
    .setColor(tokyo_color)
    .setFooter(`${client.user.username}#${client.user.discriminator}`, client.user.displayAvatarURL({dinamyc : true}))
    .setTimestamp()
    
    message.respond(bytokyo2)
  }
  }