const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const emoji = require("../../utils/emojis.js");

module.exports = {
    name: "binary",
    aliases: ["binário", "binario"],
    usage: 'binary <mensagem que será codificada>',
  category: 'fun',
    run: async (client, message, args) => {
        const url = `http://some-random-api.ml/binary?text=${args}`;

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.respond(`um erro ocorreu tente novamente mais tarde!`)
        }
        if (!args[0]) return message.respond(`fale algo`)

        const embed = new MessageEmbed()
            .setTitle('Codigo binário')
            .setDescription(data.binary)
            .setFooter(` | Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        await message.respond(embed)
    }
}