const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	const saycmd = args.join(" ")
		message.delete()
		message.channel.send(saycmd)
		const embed = new Discord.RichEmbed()
		.setColor([182, 244, 66])
		.addField(`User ${message.author.username}#${message.author.discriminator}, server ${message.guild.name} used say with text:`, `${saycmd}`)
		bot.channels.get('400273922723151881').send(embed)
		message.channel.stopTyping()
}

module.exports.help = {
    name: "say"
}