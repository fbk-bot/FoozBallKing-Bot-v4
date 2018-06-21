const Discord = require('discord.js');
const request = require('request')
const bot = new Discord.Client();
const config = require("../../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	const argus = message.content.toLowerCase().split(" ").slice(1)
	function hero(text) {
	if(text == 'ana')
		return 1
	else if(text == 'bastion')
		return 2
	else if(text == 'dva')
		return 3
	else if(text == 'd\'va')
		return 3
	else if(text == 'genji')
		return 4
	else if(text == 'hanzo')
		return 5
	else if(text == 'junkrat')
		return 6
	else if(text == 'lucio')
		return 7
	else if(text == 'mccree')
		return 8
	else if(text == 'mei')
		return 9
	else if(text == 'mercy')
		return 10
	else if(text == 'pharah')
		return 11
	else if(text == 'reaper')
		return 12
	else if(text == 'reinhardt')
		return 13
	else if(text == 'roadhog')
		return 14
	else if(text == 'soldier76')
		return 15
	else if(text == 'symmetra')
		return 16
	else if(text == 'torbjorn')
		return 17
	else if(text == 'tracer')
		return 18
	else if(text == 'widowmaker')
		return 19
	else if(text == 'winston')
		return 20
	else if(text == 'zarya')
		return 21
	else if(text == 'zenyatta')
		return 22
	else if(text == 'sombra')
		return 23
	else if(text == 'orisa')
		return 24
}
	if(!argus) {
		const embed = new Discord.RichEmbed()
		.setColor([179, 0, 0])
		.addField('**ERROR!**', 'No hero defined!')
		message.channel.send(embed)
	} else {
	request.get(`https://overwatch-api.net/api/v1/hero/${hero(argus)}`, { json: true }, async (err, res, body) => {
		if(body.error) {
			const embed = new Discord.RichEmbed()
			.setColor([179, 0, 0])
			.addField('**ERROR!**', 'Invalid hero!')
			message.channel.send(embed)
		} else {
			const embed = new Discord.RichEmbed()
			.setColor("RANDOM")
			.addField('Name', body.name, true)
			.addField('Description', body.description, true)
			.addField('Age', body.age, true)
			.addField('Base of Operations', body.base_of_operations, true)
			.addField('Abilities', body.abilities.size, true)
			message.channel.send(embed)
		}
	})
	}
	message.channel.stopTyping()
}

module.exports.help = {
    name: "hero"
}