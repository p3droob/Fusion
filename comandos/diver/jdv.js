const { tictactoe } = require('reconlx')

module.exports = {
    name : 'jogo da velha',
    aliases: ["jogodavelha"],
    usage: "jdv <usuário>",
    description: "Uma boa e velha partida de jogo da velha com alguém",
    run: async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('**Especifique um membro!**')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}