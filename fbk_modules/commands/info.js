const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
		message.channel.send(`Hello, I am FoozBallKing Bot ${version}! Type |help for my commands!\nDevelopers: Naz // ► .... ►#1760, CodaEnder#0001\n${bot.guilds.size} guilds, ${bot.users.size} users`)
		message.channel.stopTyping()
		}

module.exports.help = {
    name: "info"
}