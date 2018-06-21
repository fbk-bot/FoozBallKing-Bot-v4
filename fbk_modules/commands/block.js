const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args, blocks, Developer, errorNoPerm) => {
	message.channel.startTyping()
	if(Developer.some(devid => message.author.id.includes(devid))) {
		message.channel.send('your dick sucks dicks')
	} else {
		message.channel.send(errorNoPerm)
	}
	message.channel.stopTyping()
}

module.exports.help = {
    name: "command"
}