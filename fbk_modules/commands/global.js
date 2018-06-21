// member.guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"))

const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const version = (config.version)
const fbkCore = require('../../FBK-Core.js')

module.exports.run = async (bot, message, args, Developer, errorNoPerm, errorColor) => {
	message.channel.startTyping()
    // Code
    if(Developer.some(dev => message.author.id.includes(dev))) {
        try {
            bot.channels.find(c=> c.permissionsFor(c.guild.members.get(bot.user.id)).hasPermission("SEND_MESSAGES")).send(args.join(" "))
            message.channel.send(`Sent to ${bot.channels.find(c=> c.permissionsFor(c.guild.members.get(bot.user.id)).hasPermission("SEND_MESSAGES")).size} guilds!`)
        } catch (err) {
            message.channel.send(fbkCore.giveErr(err))
        }
    } else {
        message.channel.send(errorNoPerm)
    }
	message.channel.stopTyping()
}

module.exports.help = {
    name: "global"
}