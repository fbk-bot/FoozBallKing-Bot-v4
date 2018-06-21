const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	var days = Math.floor(bot.uptime / 86400000)
		var hours = Math.floor((bot.uptime % 86400000) / 3600000)
		var minutes = Math.floor(((bot.uptime % 86400000) % 3600000) / 60000)
		var seconds = Math.floor((((bot.uptime % 86400000) % 360000) % 60000) / 1000)
		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField('Developer', '<@379274926621720576>, <@249467130108575745>', true)
		.addField('Owner', '<@245369326322843649>', true)
		.addField('Guilds', bot.guilds.size, true)
		.addField('Users', bot.users.size, true)
		.addField('Modules Used', '[discord.js](https://discord.js.org), fs, [discord.js-musicbot-addon](https://github.com/DarkoPendragon/discord.js-musicbot-addon)', true)
		.addField('CPU & RAM Usage', `CPU: ${(process.cpuUsage().user / 1000 / 1000).toFixed(2)}%\nRAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
		.addField('Uptime', `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`, true)
		message.channel.send(embed)
	message.channel.stopTyping()
}

module.exports.help = {
    name: "botinfox"
}