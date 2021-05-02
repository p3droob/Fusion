const Discord = require("discord.js");
const quote = require("../../utils/quote.js")
const os = require('os')
 
module.exports = {
  name: 'botinfo',
  aliases: ["binfo", "bi"],
  usage: 'botinfo',
  description: 'mostra informações sobre mim',
  run: async (client, message, args) => {
    let modelo = os.cpus().map((i) => `${i.model}`)[0]
    const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`Bot info`)
    .setTimestamp()
    .setDescription(`Olá ${message.author} você pode visualizar uma lista sobre mim abaixo:\n\n<:info_Fusion:832571072711753768>Informações\n<:developer_Fusion:824604428140019743>Meu desenvolvedor: Mr. Frozen Fire#8208\n<:host_Fusion:831121757732601898>Vote no meu servidor: [votar](https://top.gg/servers/812266828196741121)\nVote em mim: [votar](https://www.zuraaa.com/bots/812272055457546271/)\n<:suporte_Fusion:824603708783460422>Entre no meu servidor: [entrar](https://discord.com/invite/AxcQf5Pf58)\nMeu site: [clique aqui](https://sites.google.com/view/fusion-suporte/)\nMe adicione ao seu servidor: [clique aqui](https://discord.com/oauth2/authorize?client_id=812272055457546271&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D812272055457546271%26permissions%3D8%26redirect_uri%3Dhttps%253A%252F%252Fdiscord.com%252Fapi%252Foauth2%252Fauthorize%253Fclient_id%253D812272&scope=bot)\n\n<:configurar_Fusion:824604269029752832>Estatísticas\n<a:ping_Fusion:824604322981085184>Meu ping: **${Math.round(client.ws.ping)}** ms\n<:rei_Fusion:831121925820121118> Servidores: **${client.guilds.cache.size}**\n<:membros_Fusion:831537357953302559>Usuários: **${client.users.cache.size}**\n<:canal_Fusion:831537857554284604>Canais: ${client.channels.cache.size}\nPocessador: ${modelo}\nCPU: \`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}\`%\nRAM: \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}\`MB`)
    .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))

    message.quote(embed);
}
}