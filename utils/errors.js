require("../utils/quote.js")
module.exports.noUser = (message) => {
    message.quote("**<:errado:824911072384647178> Não foi possivel achar o usuario**").then(m => m.delete({timeout: 60000}))
}
module.exports.noContent = (message) => {
    message.quote("**Não especificou um Motivo/Mensagem**").then(m => m.delete({timeout: 60000}))
}//permissionFor
module.exports.noChannel = (message) => {
    message.quote("**Não especificou um canal**").then(m => m.delete({timeout: 60000}))
}
module.exports.noRole = (message) => {
    message.quote("**<:errado:824911072384647178> Não especificou um cargo**").then(m => m.delete({timeout: 60000}))
}
module.exports.clientPosition = (message) => {
    message.quote("**<:errado:824911072384647178> Não consigo executar este comando pois meu cargo é muito baixo**").then(m => m.delete({timeout: 60000}))
}
module.exports.userPosition = (message) => {
    message.quote("**<:errado:824911072384647178> Seu cargo é muito baixo para este comando**").then(m => m.delete({timeout: 60000}))
}
module.exports.noTemp = (message) => {
    message.quote("**<:errado:824911072384647178> Você não especificou um tempo**").then(m => m.delete({timeout: 60000}))
}
module.exports.isNaN = (message) => {
    message.quote("**<:errado:824911072384647178> Você deve me dar uma quantia numerica para este este comando**").then(m => m.delete({timeout: 60000}))
}
module.exports.notNaN = (message) => {
    message.quote("**<:errado:824911072384647178> Você não pode utilizar uma numeração exata para este comando**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryChannel = (message) => {
    message.quote("**<:errado:824911072384647178> Você ja setou este canal**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryRole = (message) => {
    message.quote("**<:errado:824911072384647178> Você ja setou este cargo**").then(m => m.delete({timeout: 60000}))
}
module.exports.userRole = (message) => {
    message.quote("**<:errado:824911072384647178> O user ja tem o cargo mencionado ou de mute**").then(m => m.delete({timeout: 60000}))
}
module.exports.autoPunish = (message) => {
    message.quote("**<:errado:824911072384647178> Você não pode se punir**").then(m => m.delete({timeout: 60000}))
}
module.exports.muteRole = (message) => {
    message.quote("**<:errado:824911072384647178> Não foi possivel encontrar o meu cargo de Mute, por isso criei para você execute o comando novamente**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryMute = (message) => {
    message.quote("**<:errado:824911072384647178> Este usuario não está mutador**").then(m => m.delete({timeout: 60000}))
}
module.exports.noBans = (message) => {
    message.quote("**<:errado:824911072384647178> Não achei o id na lista de bans**").then(m => m.delete({timeout: 60000}))
}
module.exports.lengthNumber = (message) => {
    message.quote("**<:errado:824911072384647178> Você deve dar um valor menor**").then(m => m.delete({timeout: 60000}))
}
module.exports.lengthText = (message) => {
    message.quote("**<:errado:824911072384647178> Você deve dar um texto menor**").then(m => m.delete({timeout: 60000}))
}
module.exports.negativeNumber = (message) => {
    message.quote("**<:errado:824911072384647178> Você não pode dar um valor negativo**").then(m => m.delete({timeout: 60000}))
}
module.exports.clearLength = (message) => {
    message.quote("**<:errado:824911072384647178> Você só pode excluir de 0 a 99 mensagens**").then(m => m.delete({timeout: 60000}))
}
module.exports.noInvite = (message) => {
    message.quote("**<:errado:824911072384647178> Não pode conter invites ou links!**").then(m => m.delete({timeout: 60000}))
}
module.exports.permissionFor = (message) => {
    message.author.send("** Eu não possuo a permissão de `Enviar Mensagens` neste canal**")
}
module.exports.noAnime = (message) => {
    message.quote("**<:errado:824911072384647178> Por Favor me dê o nome de um anime para buscar**").then(m => m.delete({timeout: 60000}))
}
module.exports.noManga = (message) => {
    message.quote("**<:errado:824911072384647178> Por Favor me dê o nome de um manga para buscar**").then(m => m.delete({timeout: 60000}))
}
module.exports.noClima = (message) => {
    message.quote("**<:errado:824911072384647178> Por Favor me dê o nome de um estado ou cidade para buscar**").then(m => m.delete({timeout: 60000}))
}
module.exports.noCovid = (message) => {
    message.quote("**<:errado:824911072384647178> Por Favor me dê o nome de um pais para buscar**").then(m => m.delete({timeout: 60000}))
}
module.exports.noVcm = (message) => {
    message.quote("**<:errado:824911072384647178> Não estou em um canal de voz para buscar informações, faça-me entrar através do comando `<prefixo>summon`**").then(m => m.delete({timeout: 60000}))
}
module.exports.noMention = (message) => {
    message.quote("**<:errado:824911072384647178> Você não pode mencionar here ou everyone!**").then(m => m.delete({timeout: 60000}))
}
module.exports.noRole = (message) => {
    message.quote("**<:errado:824911072384647178> O usuário não possui o cargo mencionado!**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryLock = (message) => {
    message.quote("**<:errado:824911072384647178> Este canal ja está trancado**").then(m => m.delete({timeout: 60000}))
}
module.exports.tryunlock = (message) => {
    message.quote("**<:errado:824911072384647178> Este canal não está trancado**").then(m => m.delete({timeout: 60000}))
}