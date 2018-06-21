const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	const msgPong = await message.channel.send("Checking for the ping...");
  const pingReturn = new Discord.RichEmbed()
        .setColor([182, 244, 66])
        .setAuthor(`FoozBallKing Bot`, bot.user.avatarURL)
    .addField(`Message:`, `${msgPong.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField(`API:`, `${Math.round(bot.ping)}ms`, true)
    .addField('Ping Command Creator:', '<@249467130108575745>')
    msgPong.edit(pingReturn);
	message.channel.stopTyping()
}

module.exports.help = {
    name: "ping"
}