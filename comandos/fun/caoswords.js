  const { ChaosWords } = require("weky");
  const Discord = require('discord.js');
  var randomWords = require('random-words');
  const words = randomWords(2) // generating 2 words
module.exports = {
  name: 'caoswords',
  category: 'fun',
  run: async (client, message, args) => {
  await new ChaosWords({
      message: message,
      maxTries: 8, //max number  of user's tries (ends when reach limit)
      charGenerated: 20, //length of sentence (small length might throw error)
      words: words, //words (array) => ['word']
      embedTitle: 'Chaos words!', //understable
      embedFooter: 'Procure palavras na sentença',
      embedColor: '36393F'
      }).start()
      }
      }