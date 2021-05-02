const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const quote = require("../../utils/quote.js")
const cooldowns = {};
const ms = require("ms");
const emoji = require("../../utils/emojis.js");

module.exports = {
    name: "binary",
    aliases: ["binário", "binario"],
    usage: 'binary <mensagem que será codificada>',
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
        const url = `http://some-random-api.ml/binary?text=${args}`;

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.quote(`um erro ocorreu tente novamente mais tarde!`)
        }
        if (!args[0]) return message.quote(`fale algo`)

        const embed = new MessageEmbed()
            .setTitle('Codigo binário')
            .setDescription(data.binary)
            .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        await message.quote(embed)
    }
}