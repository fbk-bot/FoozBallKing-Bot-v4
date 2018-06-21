const Discord = require('discord.js');
const fs = require('fs')
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
	fs.readFile("./help.txt", "utf8", function(error, data) {
     if (error) {
       console.error("Read error:  " + error.message);
     } else {
       message.channel.send(data);
     }		
    })
	message.channel.stopTyping()
}

module.exports.help = {
    name: "help"
}