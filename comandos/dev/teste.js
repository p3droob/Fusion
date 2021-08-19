const Discord = require("discord.js");
const path = require('path');
const fs = require('fs');
module.exports = {
    name: "teste",
  category: 'dev',
  run: async (client, message, args) => {

    message.channel.send('ok')
  }
}