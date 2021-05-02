const Discord = require('discord.js')
const db = require('quick.db')
const quote = require("../../utils/quote.js")

module.exports = {
  name: 'configs',
  aliases: ["configs", "configurações", "configuracoes"],
  usage: `configs`,
  description: `Mostra as configurações do servidor`,
  run: async (client, message, args) => {
const prefix = db.get(`${message.guild.id}.prefix`) || 'f!';
//entrada
let canalentrada =  db.fetch(`welcome_${message.guild.id}`);
if (canalentrada == null) canalentrada = 'nenhum canal definido';
//saida
let canalsaida = db.fetch(`bye_${message.guild.id}`);
if (canalsaida == null) canalsaida = 'nenhum canal definido';
//sugestão
let canalsuggest = db.fetch(`suggestchan_${message.guild.id}`);
if (canalsuggest == null) canalsuggest = 'nenhum canal definido';
//levelup
let clup = db.fetch(`channelup_${message.guild.id}`);
if (clup == null) clup = 'nenhum canal definido';
//Logs
let canallogs = await db.get(`cMod_${message.guild.id}`) || "nenhum canal definido"
//autorole
let autorole = db.fetch(`autorole_${message.guild.id}`);
if (autorole == null) autorole = 'nenhum cargo definido';
//embed
    const configs = new Discord.MessageEmbed()
    .setTitle(`Configurações de ${message.guild.name}`)
    .setColor("#00fff6")
    .setDescription(
    `**Configurações de canais**\n
    Canal de entrada: <#${canalentrada}>\nCanal de saída: <#${canalsaida}>\nCanal de sugestões: <#${canalsuggest}>\nCanal de level up: <#${clup}>\nCanal de Logs: <#${canallogs}>\n\n**Configurações extras**\n
    Autorole: <@&${autorole}>\n\n**Ativações**\nAnti-fake: \`a\``)
    message.quote(configs)
  }
}