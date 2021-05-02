module.exports = {
  name:"753252894974804068",
  run: async (client, message, args, db) => {

   if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send("Apenas meu desenvolvedor pode usar esse comando!");
   };
    let guildMap = client.guilds.cache.map( g => `**${g.name}** | **${g.id}**`).join("\n")
    message.channel.send({
      embed: {
        title: "Meus Servidores...",
        description: guildMap,
        color: "#ff0000",
        footer: "Servers."
      }
    })
  } 
}