const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)
const path = require('path')
const { giveErr } = require('../../FBK-Core.js')

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
    if(!args[0]) return message.channel.send(`No arguments defined!`)
    try {
        delete require.cache[require.resolve(path.join(__dirname, `./${args[0]}.js`))]
        let props = require(path.join(__dirname, `./${args[0]}.js`))
        bot.commandCores.set(props.help.name, props)
        message.channel.send(`Successfully reloaded "${args[0]}"!`)
    } catch (err) {
        message.channel.send(giveErr(err))
    }
	message.channel.stopTyping()
}

module.exports.help = {
    name: "reload"
}