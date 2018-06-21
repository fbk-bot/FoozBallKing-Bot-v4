const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	if(message.channel.type == 'dm') {
		const embed = new Discord.RichEmbed()
		.setColor([179, 0,0 ])
		.addField('Sneaky...', 'Running this command in DMs? Nope.')
		message.channel.send(embed)
	} else {
	message.channel.startTyping()
	const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setThumbnail(message.guild.iconURL)
		.addField('Server', `${message.guild.name} (ID: ${message.guild.id})`, true)
		.addField('Region', message.guild.region, true)
		.addField('Owner', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator} (ID: ${message.guild.owner.user.id})`, true)
		.addField('Channels (That are visible to the bot)', message.guild.channels.size, true)
		.addField('Server Members', message.guild.members.size, true)
		.addField(`Roles (${message.guild.roles.size})`, message.guild.roles.map(r => r.name).join(', '), true)
		message.channel.send(embed)
	message.channel.stopTyping()
}
}

module.exports.help = {
    name: "guild"
}