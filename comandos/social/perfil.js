const Canvas = require('canvas');
const Discord = require('discord.js');
const moment = require('moment-timezone');
const EmojiRender = require('node-canvas-with-twemoji');
const DCemoji = require('node-canvas-with-twemoji-and-discord-emoji');
module.exports = {
    name: "perfil",
    aliases: ['profile'],
  category: 'social',
  run: async (client, message, args, prefix) => {

    //           DEFININDO O USER
   const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

    //           REGISTRANDO FONTES
    Canvas.registerFont(("./assets/fonts/Segoe UI Black.ttf"), { family: "Segoe UI Black" });
    Canvas.registerFont(("./assets/fonts/Poppins-Regular.ttf"), { family: "Poppins-Regular" });
    Canvas.registerFont(("./assets/fonts/TREBUC.ttf"), { family: "TREBUC"})
    
    //puxando o perfil
    let perfil = 'https://cdn.discordapp.com/attachments/824611809403207721/842167979209916437/backgr.png'

    //pegando as flags
    let UserFlags = user.flags.toArray()
    const converted = {
      HOUSE_BRAVERY: '<:hypesquad_bravery:842548351497273394>',
      HOUSE_BRILLIANCE: '<:hypesquad_briliance:842548074165436476>',
      HOUSE_BALANCE: '<:hypesquad_balance:842548416873889802>',
      EARLY_VERIFIED_BOT_DEVELOPER: '<:developer_Fusion:824604428140019743>',
      VERIFIED_DEVELOPER: '<:developer_Fusion:824604428140019743>'
      };
    
    //puxando o resto
    
    let flocos = await client.db.ref(`Users/${user.id}/flocos`).once('value').then(r => r.val()) || '0';

    //sobremim
    let aboutme = await client.db.ref(`Users/${user.id}/aboutme`).once('value').then(r => r.val())
    if (aboutme == null) aboutme = `Olá eu sou o ${user.username} (Você pode alterar isso usando ${prefix}sobremim)!`;
    //reps
    let reps = await client.db.ref(`Users/${user.id}/reps`).once('value').then(r => r.val());
    if (reps == null) reps = '0';
    //level
    let xpL = await client.db.ref(`Guilds/${message.guild.id}/users/${user.id}/xp`).once('value').then(r => r.val()) || 0;
    let xpG = await client.db.ref(`Users/${user.id}/xp`).once('value').then(r => r.val()) || 0;

    let casal1;

    let casal = await client.db.ref(`Users/${user.id}/marry`).once('value').then(r => r.val());
    if (casal !== null) casal1 = client.users.cache.get(casal).tag;

    let casaltime = await client.db.ref(`Users/${user.id}/marrytime`).once('value').then(r => r.val());
    if (casaltime !== null) casaltime = moment(Number(casaltime)).tz('America/Sao_Paulo').fromNow();

    let msgInfo = `Flocos: ${flocos}\nLocal: ${xpL} XP\nGlobal: ${xpG} XP`
    if (casal !== null) msgInfo = `Flocos: ${flocos}\nLocal: ${xpL} XP\nGlobal: ${xpG} XP\nCasado com:\n${casal1}\n${casaltime || ''}`
    //            CANVAS
    const canvas = Canvas.createCanvas(1000, 600);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(perfil);

  
    ctx.drawImage(background, 5, 10, canvas.width, canvas.height);


    ctx.font = `30px Segoe UI Black`;
    ctx.fillStyle = '#ff0000';
    await EmojiRender.fillTextWithTwemoji(ctx, 
    user.username, 130, 40)

    ctx.font = '25px Segoe UI Black';
    ctx.fillStyle = 'WHITE';
    await EmojiRender.fillTextWithTwemoji(ctx,
    msgInfo, 9, 250)

    ctx.font = '35px Segoe UI Black'
    ctx.fillStyle = 'WHITE'
    await DCemoji.fillTextWithTwemoji(ctx,
    UserFlags.map(a => converted[a]).join(' '), 9, 200)

    ctx.font = '45px Segoe UI Black';
    ctx.fillStyle = 'WHITE';
    ctx.fillText(`Sobremim`, 20, 518)
    
    ctx.font = '30xp Segoe UI Black';
    ctx.fillStyle = "BLACK";
    ctx.fillText(`${reps} reps`, 750, 100)

    ctx.font = '25px Segoe UI Black';
    ctx.fillStyle = 'WHITE';
    await DCemoji.fillTextWithTwemoji(ctx,
    aboutme, 20, 560)
    

    //Avatar
    ctx.beginPath();
    ctx.arc(75, 75, 60, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 13, 15, 130, 130);//520, 79, 200, 200
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), perfil);


    message.respond(attachment);
  }
  }