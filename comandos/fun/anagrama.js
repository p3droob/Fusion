var randomWords = require('random-words');
const word = randomWords();
const Discord = require('discord.js');
const { ShuffleGuess } = require('weky');
module.exports = {
  name: 'anagrama',
  category: 'fun',
  run: async (client, message, args) => {
const game = new ShuffleGuess({
              message: message,
              word: word, // or a simple word
              winMessage: "Parabéns, você venceu!", // message sent when user's message matches with the word
              colorReshuffleButton: 'green', // color of the reshuffle button (regen)
              messageReshuffleButton: 'reshuffle', 
              colorCancelButton: 'red', 
              messageCancelButton: 'cancel', 
              client: client
});
game.start();
  }
  }