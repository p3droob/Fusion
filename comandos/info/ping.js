const quote = require("../../utils/quote.js")
module.exports = {
  name: 'ping',
  description: 'Ping!',
  aliases: ['pong', 'p'],
  usage: 'ping',
  run: async (client, message, args) => {
    message.quote(`<a:ping_Fusion:824604322981085184> **| Porta de entrada:** **${Date.now() - message.createdTimestamp}ms**\n<a:ping_Fusion:824604322981085184> **| Latência da API :** **${Math.round(
      client.ws.ping,
      )}ms**`);
  },

};