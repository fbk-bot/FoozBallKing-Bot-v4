const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	// Code
	message.channel.stopTyping()
}

module.exports.help = {
    name: "command"
}