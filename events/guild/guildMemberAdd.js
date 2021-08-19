const Discord = require("discord.js");

module.exports = async (client, member) => {
let prefix = await client.db.ref(`Guilds/${member.guild.id}/prefix`).once('value').then(r => r.val()) || 'f';
let canalToSend = await client.db.ref(`Guilds/${member.guild.id}/configs/channels/welcome`).once('value').then(r => r.val());
if (canalToSend === null) return;
let canalGet = await member.guild.channels.cache.get(canalToSend);
if (!canalGet.permissionsFor(client.user.id).has('SEND_MESSAGES')) return;
if (!canalGet.permissionsFor(client.user.id).has('VIEW_CHANNEL')) return;
 let canal = await member.guild.channels.cache.get(canalToSend) 
    if (canal) {
        let msg2 = await client.db.ref(`Guilds/${member.guild.id}/configs/msg/welcome`).once('value').then(r => r.val()) || `**${member.user.username}** seja bem-vindo ao ${member.guild.name}!`
          canal.send(
              msg2.replace("{member:mention}", `${member}`).replace("{member:username}", `${member.user.username}`).replace("{member:count}", `${member.guild.memberCount}`
        ).replace("{member:id}", `${member.id}`).replace("{guild:name}", `${member.guild.name}`))
    } else {
        return;
    }
    let roleToAdd = await client.db.ref(`Guilds/${member.guild.id}/configs/autorole`).once('value').then(r => r.val());
     let role = await member.guild.roles.cache.get(roleToAdd)
  if(!role) {
    return
  } else{
member.roles.add(role.id)
  }
  
  
  }