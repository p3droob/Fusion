const Discord = require("discord.js")
const quote = require("../../utils/quote.js")
const cooldowns = {};
const ms = require("ms");
const emoji = require("../../utils/emojis.js");

module.exports = {
  name: 'coinflip',
  aliases: ["caracoroa"],
  usage: "coinflip cara/coroa",
  description: "escolha cara ou coroa",
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
  var array1 = ["cara", "coroa"];

  var rand = Math.floor(Math.random() * array1.length);

  if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa")) {
    message.quote("insira **cara** ou **coroa** na frente do comando.");
  } 
else if (args[0].toLowerCase() == array1[rand]) {
    message.quote("Deu **" + array1[rand] + "**, você ganhou dessa vez!");
  } 
else if (args[0].toLowerCase() != array1[rand]) {
    message.quote("Deu **" + array1[rand] + "**, você perdeu dessa vez!"
    );
  }
}
}