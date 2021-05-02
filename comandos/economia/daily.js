module.exports = {
  name: 'daily',
  aliases: ['daily', 'diario', 'diário'],
  usage: 'daily',
  description: 'pegue seu prêmio diário',
  run: async (client, message) => {
    const db = require('quick.db');
    const ms = require('parse-ms');
    const quote = require("../../utils/quote.js")

    const user = message.author;

    const timeout = 43200000;
    const amount = Math.floor(Math.random() * 18000);

    const daily = await db.fetch(`daily_${user.id}`);
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      const time = ms(timeout - (Date.now() - daily));

      message.quote(`Você já coletou seu daily hoje! Tente de novo em **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
    } else {
      db.add(`flocos_${user.id}`, amount);
      db.set(`daily_${user.id}`, Date.now());

      const money = await db.fetch(`flocos_${user.id}`);
      message.quote(`Você coletou no seu daily ${amount} flocos❄️!`);
    }
  },
}