const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	const kissList = [
			"https://media.giphy.com/media/dP8ONh1mN8YWQ/giphy.gif",
			"https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif",
			"https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
			"https://media.giphy.com/media/wf4UuPMYnwBck/giphy.gif",
			"https://media.giphy.com/media/CzCi6itPr3yBa/giphy.gif",
			"https://media.giphy.com/media/12VXIxKaIEarL2/giphy.gif",
			"https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif",
			"https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif",
			"https://media.giphy.com/media/K4VEsbuHfcj6g/giphy.gif",
			"https://media.giphy.com/media/xiOfpOVHblXOg/giphy.gif",
			"https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
			"https://media.giphy.com/media/oHZPerDaubltu/giphy.gif",
			"https://media.giphy.com/media/OSq9souL3j5zW/giphy.gif",
			"https://media.giphy.com/media/7eQ8Ky3dAsRYA/giphy.gif"
		]
		const result = Math.floor((Math.random() * kissList.length) + 0)
		const kissThis = message.mentions.users.first()
		if(!kissThis) {
			message.channel.send('Aw, that\'s sad... You don\'t have anyone to kiss...')
		} else if(kissThis.id == bot.user.id) {
			message.channel.send('*Don\'t even try to kiss me... I\'m a bot...*')
		} else if(kissThis.id == message.author.id) {
			message.channel.send('Aw, you\'re lonely....')
		} else {
			const embed = new Discord.RichEmbed()
			.setColor([255, 0, 220])
			.setImage(kissList[result])
			message.channel.send(`:heart: ${kissThis} was kissed by ${message.author}! :heart:`)
			message.channel.send(embed)
		}
		message.channel.stopTyping()
}

module.exports.help = {
    name: "kiss"
}