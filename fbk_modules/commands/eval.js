const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const version = (config.version)
const request = require('snekfetch')

module.exports.run = async (bot, message, args, Developer, errorNoPerm, errorColor) => {
	function clean(text) { // For Eval
	if (typeof(text) === "string")
	  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}
	if(Developer.some(devid => message.author.id.includes(devid))) {
message.channel.startTyping()
		try {
      const code = args.join(" ");
      let evaled = eval(code);
    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
      const evalEmbed = new Discord.RichEmbed()
        .setColor([182, 244, 66])
        .setAuthor(`FBK-Bot ${version} | Evaulation of Code`, bot.user.avatarURL)
        .setDescription(evaled)
        .setFooter(`FBK Bot 2018`)
      message.channel.send(evalEmbed)
    } catch (err) {
      const evalErrorEmbed = new Discord.RichEmbed()
        .setColor(errorColor)
        .setAuthor(`FBK-Bot ${version} | Evaulation Fail`, bot.user.avatarURL)
        .setTitle("Evaluation of code has failed!")
        .setDescription(clean(err))
        .setFooter(`FBK Bot 2018`)
      message.channel.send(evalErrorEmbed)
}
message.channel.stopTyping()
	} else {
		message.channel.startTyping()
		message.channel.send(errorNoPerm)
		message.channel.stopTyping()
	}
}

module.exports.help = {
    name: "eval"
}