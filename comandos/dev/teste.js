const Canvas = require('canvas');
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const ms = require("parse-ms");

module.exports = {
    name: "teste",
    description: "sim",
    timeout: 1000,
  run: async (bot, message, args) => {
  
   const user = message.mentions.members.last() || message.member;

//flocos
  let flocos = await db.fetch(`flocos_${user.id}`)
  if (flocos === null) flocos = 0;
//casado
  let casado = await db.fetch(`married_${user.id}`)
  if(casado === null) casado = 'ninguém'
//background

 
  let perfil1 = await db.fetch(`perfil_${message.guild.id}_${user.id}`);
  if (perfil1 === null) perfil1 = 'https://cdn.discordapp.com/attachments/824611809403207721/837099450148454461/s.png'

//perfil1
const canvas = Canvas.createCanvas(850, 500);
const ctx = canvas.getContext('2d');
const background = await Canvas.loadImage();

  
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);



    //texto
    ctx.font = '30px Arial';
    ctx.fillStyle = 'WHITE';
    ctx.fillText(`${user.user.tag}`, 520, 300);
    ctx.fillText(`________________`, 420, 320)
    ctx.fillText(`Carteira: ${flocos} flocos`, 420, 390)
    ctx.fillText(`________________`, 420, 400)
    
    ctx.font = '25px Arial';
    ctx.fillStyle = 'WHITE';
    ctx.fillText(`Casado com: ${casado}`, 420, 487)
    


    //Arc
    ctx.beginPath();
    //Trace un rond
    ctx.arc(625, 180, 90, 0, Math.PI * 2, true);
    ctx.closePath();
    //dire que ce qui n'est pas dans le rond sera coupé ce qui donnera une pp arrondie
    ctx.clip();

    const avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 520, 79, 200, 200);

 
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), perfil1);


    message.channel.send(attachment);
  }}