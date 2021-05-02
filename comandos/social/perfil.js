const Discord = require('discord.js')
const db = require('quick.db');
const quote = require("../../utils/quote.js")

module.exports = {
    name: "perfil",
    aliases: ["profile"],
    run: async (client, message, args) => {

const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';

const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
//casal
let casal = client.users.cache.get(db.fetch(`married_${user.id}`, message.author.id));
if (casal == null) casal = 'ninguém';
//casalid
let casalid = db.fetch(`married_${user.id}`, message.author.id);
if (casalid == null) casalid = '';
//sobremim
let aboutme = await db.fetch(`aboutme_${user.id}`);
if (aboutme == null) aboutme = `Olá eu sou o ${user.username} (Você pode alterar isso usando ${prefix}sobremim)!`;
//atm
let atm = await db.get(`flocos_${user.id}`) || 0;
//bugs
let bugs = db.fetch(`bugs_${user}`) || 0;

//reps
let reps = db.fetch(`reps_${user.id}`);
if (reps == null) reps = '0';

//reps enviadas
let repsend = db.fetch(`repsend_${user}`) || 0;
//level
let level = db.fetch(`level_${message.guild.id}_${user.id}`) || 0;
let lvlglobal = db.fetch(`lvlglobal_${user.id}`) || 0;
//embed
let embed = new Discord.MessageEmbed()
.setColor('#ff0000')
.setTitle(`Perfil de ${user.username}`)
.setDescription(`Casado(a) com: ${casal} \`(${casalid})\`\nFlocos: ${atm}\nReputações recebidas: ${reps}\nReputações enviadas: ${repsend}\nLevel no servidor: ${level}\nLevel global: ${lvlglobal}\nBugs reportados: ${bugs}\nSobre mim: **${aboutme}**`)
.setFooter(` | Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
message.quote(embed)
    }
}