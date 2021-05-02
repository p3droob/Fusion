const quote = require("../../utils/quote.js")

module.exports = {
  name: 'rep',
  aliases: ['reputar'],
  run: async (client, message, args) => {
    const db = require('quick.db');
    const ms = require('parse-ms');

    const user = message.mentions.members.first() || client.users.cache.get(args[0])

    if (user == message.author.id) return message.quote('você não pode dar reputação para você mesmo!');

    if (!user) return message.quote('mencione alguém para dar reputação!');

    const timeout = 3600000;
    const amount = 1;
    const rep = db.fetch(`reps_${user.id}`);
    const out = db.fetch(`timeout_${message.author.id}`);
    if (rep !== null && timeout - (Date.now() - out) > 0) {
      const time = ms(timeout - (Date.now() - out));

      message.quote(`Você precisa esperar ** ${time.minutes}minutos e ${time.seconds}segundos** para dar outra reputação`);
    } else {
      db.add(`reps_${user.id}`, amount);
      db.add(`repsend_${message.author}`, amount);
      let repsend = db.fetch(`repsend_${message.author}`);
      db.set(`timeout_${message.author.id}`, Date.now());
      const noworep = db.fetch(`rep_${user.id}`);
      message.quote(`${message.author} deu ${amount} reputação para ${user}! Até agora você enviou ${repsend} reputações`);
    }
  },
};