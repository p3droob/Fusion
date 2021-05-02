const db = require('quick.db')
const quote = require("../../utils/quote.js")

module.exports = {
    name: "divorciar",
    aliases: ['divorce','divorciar'],
    run: async (client, message, args) => {       
        
    const user2 = await db.fetch(`married_${message.author.id}`)
    if (user2 == null) return message.quote(` você precisa estar casado para se divorciar!`);
    const user = await client.users.fetch(user2)
    if(user2 !== user.id) return message.quote(`${user.id} Não está casado com ${user.username}`)
    message.quote(`Você tem certeza que quer se divorciar de **${user.username}**?`).then((msg) => {
        
  msg.react('💔');
    const filterYes = (reaction, usuario) => reaction.emoji.name === '💔' && usuario.id === message.author.id;

    const yesCollector = msg.createReactionCollector(filterYes, { max: 1, time: 60000});

    yesCollector.on('collect', () => {
        msg.reactions.removeAll().catch();
     message.quote(` você se divorciou de ${user.username}, procure outro companheiro para ser feliz :heart:`)

    db.delete(`married_${message.author.id}`)
    db.delete(`married_${user.id}`)
})
    }
    )}
}