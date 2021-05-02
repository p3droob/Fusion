const db = require('quick.db') //Fetching the quick.db module
const {MessageEmbed, discord} = require('discord.js')//Fetching the MessageEmbed constructor and discord library

module.exports = {//Command Configuration
    name: "sugerir",//Command name
    description: "sugira algo para todos",//The command description for the help command
    aliases: ['suggest'],//The command alias EX: People could use <p>s <suggestion> instead of <p>suggest <suggestion>
    usage: "sugerir <sugestão>",
    run: async(bot, message, args) => {//Running the command(Writing our code so it could import it)
        let avatar = message.author.avatarURL({ dynamic: true, format: "gif", size: 1024 });

        const content = args.join(" ");

        var channel = message.guild.channels.cache.get(db.fetch(`suggestchan_${message.guild.id}`))//Gets the channel
        if(channel == null){
            return message.channel.send(`Não há uma configuração de canal de sugestão definida. Para definir o canal use F!setsugerir <mencione o canal ou use o id>!`)
             }
             if (!args[0]) return message.quote(`Forneça uma sugestão!`)
             if (content.length > 500) return message.quote(`${message.author}, Você deve fornecer uma mensagem com no máximo 500 caractéres!`)
        const webhooks = await channel.fetchWebhooks()
        
        var webhook = webhooks.first();//Fetches the first webhook
         
        var embed = new MessageEmbed()
            
            .setTitle(`<:notifica_Fusion:833679538192908368> | Nova Sugestão!`)
            .setThumbnail(avatar)
            .setDescription(`Sugestão: ${content}`)
            .setColor("#ff0000")
            .setFooter(`Sugestão enviada por: ${message.author}, ID: ${message.author.id}.`)
           
        
        let m = await webhook.send({
            username: message.author.username,
            avatarURL: message.author.displayAvatarURL({dynamic: true}),
            embeds: [embed]
        })
        channel.messages.fetch(m.id).then(msg => {
        msg.react('824604719145287722').then(r => {
        msg.react('824604753388503121').then(r => {
            })
          })  
        })
        message.quote(` <a:fogo_coloridoFusion:816983900584542218> | Sua sugestão foi enviada para o canal <#${channel.id}>.`)
        message.delete()
        
        .catch((err)=>{
            console.log(err)
        })


    }
}