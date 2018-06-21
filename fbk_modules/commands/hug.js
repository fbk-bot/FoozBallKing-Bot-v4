const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	const huggles = [
			"https://media.giphy.com/media/kvKFM3UWg2P04/giphy.gif",
			"https://media.giphy.com/media/wnsgren9NtITS/giphy.gif",
			"https://media.giphy.com/media/HaC1WdpkL3W00/giphy.gif",
			"https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif",
			"https://media.giphy.com/media/LWTxLvp8G6gzm/giphy.gif",
			"https://media.giphy.com/media/EvYHHSntaIl5m/giphy.gif",
			"https://media.giphy.com/media/llmZp6fCVb4ju/giphy.gif",
			"https://media.giphy.com/media/3oEjI72YdcYarva98I/giphy.gif",
			"https://media.giphy.com/media/OiKAQbQEQItxK/giphy.gif",
			"https://media.giphy.com/media/l2JJOsEYzQbtvV0A0/giphy.gif",
			"https://media.giphy.com/media/l2JJySFVazmR38Lks/giphy.gif"
		]
		const result = Math.floor((Math.random() * huggles.length) + 0)
		const hugThis = message.mentions.users.first()
		if(!hugThis) {
			message.channel.send('Aw, that\'s sad... You don\'t have anyone to hug...')
		} else if(hugThis.id == bot.user.id) {
			const embed = new Discord.RichEmbed()
			.setColor([255, 0, 220])
			.setImage(huggles[result])
			message.channel.send('Yay, huggles :D')
			message.channel.send(embed)
		} else if(hugThis.id == message.author.id) {
			message.channel.send('Aw, you\'re lonely....')
		} else {
			const embed = new Discord.RichEmbed()
			.setColor([255, 0, 220])
			.setImage(huggles[result])
			message.channel.send(`:heart: ${hugThis} was hugged by ${message.author}! :heart:`)
			message.channel.send(embed)
		}
		message.channel.stopTyping()
}

module.exports.help = {
    name: "hug"
}