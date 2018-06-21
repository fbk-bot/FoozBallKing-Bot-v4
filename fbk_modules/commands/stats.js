const Discord = require('discord.js');
const request = require('request')
const bot = new Discord.Client();
const config = require("../../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	const argus = message.content.split(" ").slice(1)
	if(!argus) {
		const embed = new Discord.RichEmbed()
		.setColor([179, 0, 0])
		.addField('**ERROR!**', 'You have no arguments!')
		message.channel.send(embed)
	} else if(argus.includes('#')) {
		const embed = new Discord.RichEmbed()
		.setColor([179, 0, 0])
		.addField('**ERROR!**', 'Okay, this one\'s a bit confusing. You require to replace `#` with `-` for your Battle.NET tag.')
		message.channel.send(embed)
	} else {
		request.get(`https://ow-api.com/v1/stats/pc/asia/${argus}/profile`, { json: true }, async (err, res, body) => {
			if(body.error) {
				const embed = new Discord.RichEmbed()
		.setColor([179, 0, 0])
		.addField('**ERROR!**', 'This account does not exist!')
		message.channel.send(embed)
			} else if(body.quickPlayStats.awards == undefined) {
				const embed = new Discord.RichEmbed()
		.setColor([179, 0, 0])
		.addField('**ERROR!**', 'No existing awards!')
		message.channel.send(embed)
			} else {
	const embed = new Discord.RichEmbed()
	.setColor("RANDOM")
	.setThumbnail(body.icon)
	.addField('Name', body.name, true)
	.addField('Level, Prestige, Rating', `${body.level}, ${body.prestige}, ${body.rating}`, true)
	.addField('Games Won', body.gamesWon, true)
	.addField('Awards (Medals + Cards, Quick Play)', Math.floor(body.quickPlayStats.awards.medals + body.quickPlayStats.awards.cards), true)
	.addField('Awards (Medals + Cards, Competitive)', Math.floor(body.competitiveStats.awards.medals + body.competitiveStats.awards.cards), true)
	message.channel.send(embed)
			}
})
	}
	message.channel.stopTyping()
}

module.exports.help = {
    name: "stats"
}