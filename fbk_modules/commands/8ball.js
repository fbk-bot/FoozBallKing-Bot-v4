const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	var sayings = ["It is certain",
										"It is decidedly so",
										"Without a doubt",
										"Yes, definitely",
										"You may rely on it",
										"As I see it, yes",
										"Most likely",
										"Outlook good",
										"Yes",
										"Signs point to yes",
										"Reply hazy try again",
										"Ask again later",
										"Better not tell you now",
										"Cannot predict now",
										"Concentrate and ask again",
										"Don't count on it",
										"My reply is no",
										"My sources say no",
										"Outlook not so good",
										"Very doubtful"];

			var result = Math.floor((Math.random() * sayings.length) + 0);
			message.channel.send(`The magical 8ball says...\n__**${sayings[result]}**__`);
			message.channel.stopTyping()
}

module.exports.help = {
    name: "8ball"
}