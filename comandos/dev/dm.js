module.exports = {
  name: 'dm',
  aliases: ["privado"],
  run: async (client, message, args) => {

   if (!['753252894974804068'].includes(message.author.id)){
    return message.channel.send("");
   }
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          ``
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send(""))
        .then(() => message.channel.send(``));
        message.delete().catch(O_o => {});
}
}
