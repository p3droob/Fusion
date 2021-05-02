const Discord = require('discord.js');
const weather = require('weather-js');
const quote = require("../../utils/quote.js")
const error = require("../../utils/errors.js")

module.exports = {
    name: "clima",
    aliases: ["temperatura", "weather", "tempo"],
    usage: "<prefix>clima (local)",
    description: "Mostra o clima de um certo local",
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)

try {
        weather.find({
            search: args,
            degreeType: 'C',
            lang: "pt-br"
        }, function (err, result) {
          
            if (err) console.log(err);
            if (!result) 
              return error.noClima(message) 
            
            if (!result[0]) return message.quote("**<:errado:824911072384647178> Não consegui encontrar esta cidade!**")
            let embed = new Discord.MessageEmbed()
                .setTitle(`**${result[0].location.name}**`)
                .addField(`**Temperatura**`, `${result[0].current.temperature}°C`)
                .addField(`**Sensação Térmica**`, `${result[0].current.feelslike}°C`)
                .addField(`**Umidade**`, `${result[0].current.humidity}%`)
                .addField(`**Vento**`, `${result[0].current.windspeed}`)
                .addField("Observação", `${result[0].current.observationtime}`)
                .addField("Dia", `${result[0].current.day}`)
                .addField("Data", `${result[0].current.date}`)
                .setColor("BLUE")
                .setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(result[0].current.imageUrl)

            message.quote(embed)
            

        })
        } catch (e) {
  return 
}
    }
}