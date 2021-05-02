const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const quote = require("../../utils/quote.js")
const cooldowns = {}
const ms = require("ms")
const emoji = require('../../utils/emojis.js')

module.exports = {
    name: "bet",
    aliases: ['apostar'],
    usage: "bet @usuário <cara/coroa> <valor a ser apostado>",
    description: 'aposte flocos com alguém1',
    run: async (client, message, args) => {

      //cooldown


    if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {
        lastCmd: null
      }
let ultimoCmd = cooldowns[message.author.id].lastCmd 
     let timeout = 5000
    if (ultimoCmd !== null && timeout- (Date.now() - ultimoCmd) > 0) {
let time = ms(timeout - (Date.now() - ultimoCmd)); 
let resta = [time.seconds, 'segundos']
 
if(resta[0] == 0) resta = ['alguns', 'millisegundos']
if(resta[0] == 1) resta = [time.seconds, 'segundo']
    message.channel.send(`${emoji.aviso} **|** Calma aí! ${message.author} você precisa esperar **${time}** para executar outro comando! 🙅`).then(msg=> {
    msg.delete({ timeout: 10000 });
        })
       return;
    } else {
                 cooldowns[message.author.id].lastCmd = Date.now() 
    }
        const user = message.mentions.users.first() || client.users.cache.get(args[0])
        const prefix = db.get(`${message.guild.id}.prefix`) || 'f!'
        let name = 'bet'
        const comando = client.commands.get(name) || client.commands.find((cmd) => cmd.aliases.includes(name))
        const noargs = new MessageEmbed()
        .setTitle(`💸 | \`${prefix}bet\``)
        
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#0cfffb')
        .setDescription("🤔 |Como usar?\n\n 📕 | **Exemplos**")
      .addFields(
      { name: `🔹 Apostar com alguém por menção`, value: `\`${prefix}bet Mr. Frozen Fire#8208 500\``},
      { name: `🔹 Apostar com alguém por ID`, value: `\`${prefix}bet 753252894974804068 1000\``},
      { name: "Aliases:", value: `\`${comando.aliases.join(", ")}\``}
      )
      .setFooter(`| Comando requisitado por: ${message.author.tag} • Economia`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));
      
        if(!user) return message.quote(noargs)
        let reply = `${user}, você quer apostar ${args[2]} flocos com ${message.author}?`

        const authorbal = await db.fetch(`flocos_${message.author.id}`)
        const userbal = await db.fetch(`flocos_${user.id}`)
    
        if(userbal < args[2]) {
            return message.quote(`:snowflake: **|** ${user} não tem flocos suficientes para apostar!`)
        } 

        if(authorbal < args[2]) {
            return message.quote(`Você não tem flocos o suficiente para apostar!`)
        }
        

        if(!args[2]) return message.quote(`você não está fazendo corretamente, faça dessa forma: ${prefix}bet <usuário> <cara/coroa> <valor>`)

        if(isNaN(args[2])) return message.quote('Digite números válidos!')
        if(user == client.user) reply = ""
        message.quote(reply).then((msg) => {

            setTimeout(() => msg.react('<:sim_Fusion:824604719145287722>'),
            1000);
            
            const filterYes = (reaction, usuario) => reaction.emoji.name === 'sim_Fusion' && usuario.id === user.id;
            const yesCollector = msg.createReactionCollector(filterYes, { max: 1, time: 60000 });
            yesCollector.on('collect', () => {

                const array1 = ['cara', 'coroa'];

                const rand = Math.floor(Math.random() * array1.length);
        
                if (!args[1] || (args[1].toLowerCase() !== 'cara' && args[1].toLowerCase() !== 'coroa')) {
                    message.reply(noargs);
        
                  } else if (args[1].toLowerCase() == array1[rand]) {
        
                    message.quote(`💸 **|** Deu **${array1[rand]}**, ${message.author} você ganhou dessa vez! Patrocinado por ${user}.`);
                    db.add(`flocos_${message.author.id}`, args[2])
                    db.subtract(`flocos_${user.id}`, args[2])
        
                  } else if (args[1].toLowerCase() != array1[rand]) {
                    message.quote(`💸 **|** Deu **${array1[rand]}**, você perdeu dessa vez! ${user} Você ganhou ${args[2]} flocos, patrocinado por ${message.author} `);
                    db.add(`flocos_${user.id}`, args[2])
                    db.subtract(`flocos_${message.author.id}`, args[2])
                  }
                
        
        
            })
        })
       
        
    }
}