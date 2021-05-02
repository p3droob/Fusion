const Discord = require('discord.js')
const db = require("quick.db")


module.exports = async (client, message) => {
  
let prefix = db.get(`${message.guild.id}.prefix`) || 'f!'

   try {

     if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase()
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd))
    
  
    if(command) command.run(client, message, args);

    if (!command) {
  return message.channel.send(`Desculpe ${message.author}, mas este comando não foi encontrado, use ${prefix}help para obter ajuda!`)  
}
  
   } catch (e) { 
     console.error(e)
   }


}