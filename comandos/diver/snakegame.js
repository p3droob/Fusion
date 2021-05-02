const { Client, Message } = require('discord.js');
const SnakeGame = require('snakecord')
module.exports = {
    name: 'snakegame',
    aliases: ["jogodacobra"],
    usage: "snakegame",
    description: "jogue um jogo da cobra",
    run: async(client, message, args) => {
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: "GREEN",
            timestamp: true,
            gameOverTitle: "Game Over"
        });
        return snakeGame.newGame(message);
    }
}