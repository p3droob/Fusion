const { MessageEmbed } = require('discord.js')
const quote = require("../../utils/quote.js")
const db = require('quick.db');

module.exports = {
    name: "marry",
    aliases: ['casar', 'marry', 'casamento'],
    run: async (client, message, args) => {

      const prefix = db.get(`${message.guild.id}.prefix`) || 'F!';
        const marryEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle(':heart: | `Casar`')
            .addFields(
                { name: `${prefix}casar <usuário>`}
                )

                .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

        const authordata = db.fetch(`married_${message.author.id}`)

        const mentioned = message.mentions.users.first();

        if (!mentioned) return message.quote(`siga o exemplo a seguir: \`${prefix}casar <usuário>\``)
        if (mentioned === client.user) return message.quote(`Eu não quero casar com você, só tenho olhos para a televisão! `)
        if (mentioned.id === message.author.id) return message.quote(` você quer casar com você mesmo? Procure alguém para ser feliz com você! `)

        if (authordata && authordata !== 'null') return message.quote(` **|** Você já está casado! Nem pense em trair!`)

        const user2 = await db.fetch(`married_${mentioned.id}`)

        if (user2 && user2 !== 'null') return message.quote(` **|** Opa! Calma ai, já ouviu essa frase "Talarico morre cedo"? Toma cuidado! ( **${mentioned.username}** já está casado)`);
        message.quote(` **|** ${mentioned} Você recebeu um pedido de casamento de , você tem 1 minuto para aceitar!`).then((msg) => {

            setTimeout(() => msg.react('❌'),
                1000);
            msg.react('💍');
            const filterYes = (reaction, usuario) => reaction.emoji.name === '💍' && usuario.id === mentioned.id;
            const filterNo = (reaction, usuario) => reaction.emoji.name === '❌' && usuario.id === mentioned.id;

            const yesCollector = msg.createReactionCollector(filterYes, { max: 1, time: 60000 });
            const noCollector = msg.createReactionCollector(filterNo, { max: 1, time: 60000 })

            noCollector.on('collect', () => {
                return message.quote(`$ **|** Me desculpe ${message.author}, mas seu pedido de casamento foi rejeitado `)
            })

            yesCollector.on('collect', () => {
                message.quote(`❤️ **|** ${message.author} e ${mentioned}, Vocês agora estão casados, felicidades para vocês dois! ❤️`)

                db.set(`married_${message.author.id}`, mentioned.id)
                db.set(`married_${mentioned.id}`, message.author.id)
            })
        })
    }
}