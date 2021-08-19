const fetch = require("node-fetch");
const error = require("../../utils/errors.js")
const db = require('quick.db')

module.exports = {
  name: "covid",
  aliases: ["corona"],
  usage: "covid country (pais)",
  description: "Mostra a situação do covid de um correto pais",
  category: 'info',
  run: async (client, message, args, prefix) => {

    if (args[0] !== 'country' || !args[0])
      return message.respond(`**Use \`${prefix}covid country <pais>\`**`)

    let country;

    if (args[0] === "country") country = args[1] && args.slice(1).join(" ");

    if (args[0] === 'country' && !country)
      return error.noCovid(message)


    if (args[0] === 'country' && country) {
      fetch(`https://disease.sh/v2/countries/${country}`)
        .then(res => res.json())
        .then(body => {
          if (!body)
            return message.respond("** Não achei status de covid-19 neste país**");
          if (body.message === "País não encontrado")
            message.reply(
              `Neste pais não existem casos ou ${country} não é um país`
            );

          const { MessageEmbed } = require("discord.js");

          const date = new Date(body.updated).toLocaleString();

          let COVIDembed = new MessageEmbed()
            .setTitle(
              `COVID-19 Status em ${body.country
              } - :flag_${body.countryInfo.iso2.toLowerCase()}:`
            )
            .setAuthor(`Ultima vez Editado ${date}`)
            .setThumbnail(body.countryInfo.flag)
            .addField("Casos", body.cases)
            .addField("Casos Do dia", body.todayCases)
            .addField("Mortes", body.deaths)
            .addField("Mortos do Dia", body.todayDeaths)
            .addField("Recuperados", body.recovered)
            .addField("Casos Ativos", body.active)
            .addField("Criticos", body.critical)
            .addField("Testes", body.tests)
            .addField(
              "Geografia",
              `**Continente:** ${body.continent}
\n**População:** ${body.population}`
            )
            .setColor("BLACK")

          message.respond(COVIDembed);
        });
    }
  }
}