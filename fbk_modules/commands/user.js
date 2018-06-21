const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	if(message.channel.type == 'dm') return
	message.channel.startTyping()
	let theUser = message.guild.member(message.mentions.users.first())
	if(!theUser) return message.channel.send('You must mention a user!').then(() => {
	message.channel.stopTyping()
		})
		if(theUser.presence.game !== null) {
			const embed = new Discord.RichEmbed()
			.setColor("RANDOM")
			.setThumbnail(theUser.user.avatarURL)
			.addField('User', `${theUser.user.username}#${theUser.user.discriminator} (ID: ${theUser.id})`)
			.addField('Nickname', theUser.nickname, true)
			.addField('Status', theUser.presence.status, true)
			.addField('Game', theUser.presence.game.name, true)
			.addField('Roles', theUser.roles.map(r => r.name).join(', '), true)
			message.channel.send(embed)
	
		} else {
			const embed = new Discord.RichEmbed()
			.setColor("RANDOM")
			.setThumbnail(theUser.user.avatarURL)
			.addField('User', `${theUser.user.username}#${theUser.user.discriminator} (ID: ${theUser.id})`)
			.addField('Nickname', theUser.nickname, true)
			.addField('Status', theUser.presence.status, true)
			.addField('Roles', theUser.roles.map(r => r.name).join(', '), true)
			message.channel.send(embed)
	
		}
		
		message.channel.stopTyping()
}

module.exports.help = {
    name: "user"
}