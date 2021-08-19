const { tictactoe } = require('reconlx')

module.exports = {
    name : 'jogo da velha',
    aliases: ["jogodavelha", "jdv"],
    usage: "jdv <usuário>",
    description: "Uma boa e velha partida de jogo da velha com alguém",
  category: 'fun',
    run: async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.respond('**Especifique um membro!**')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
        message.respond('Isso é apenas um API que pode ser encontrada aqui:\n > https://www.npmjs.com/package/reconlx')
    }
}