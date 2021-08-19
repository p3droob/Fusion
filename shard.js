const Discord = require('discord.js')
const manager = new Discord.ShardingManager("./index.js", { token: process.env.TOKEN, totalShards: "auto" }); // Acada shard criado, ele irá fazer a fragmentação da aplicação

 manager.on("shardCreate", shard => { console.log(`[GERENCIADOR-SHARD] - Shard ${shard.id} foi criado e carregado com Sucesso!`)
 }); // Notifica no console quando um shard for criado e carredado com sucesso

 manager.spawn();