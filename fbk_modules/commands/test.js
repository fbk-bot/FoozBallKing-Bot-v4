/*
bot.guilds.map(g => {
let cName;
let oriChannel;
g.channels.map(c => { 
g.channels.get(c.id).permissionsFor(this.client.user.id).has('SEND_MESSAGES')
return oriChannel = c.id
})
g.channels.get(oriChannel).send('Sorry, guys, just testing!')
})
*/

const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../../config/config.json")
const prefix = (config.prefix)
const Developer = [config.developerID]
const version = (config.version)

module.exports.run = async (bot, message, args) => {
	message.channel.startTyping()
    // Code
    bot.guilds.map(g => {
        let cName;
        let oriChannel;
        g.channels.map(c => { 
        g.channels.get(c.id).permissionsFor(bot.user.id).has('SEND_MESSAGES')
        return oriChannel = c.id
        })
        g.channels.get(oriChannel.split('').join('')[0]).send('Sorry guys, just testing!')
        // g.channels.get(oriChannel).send('Sorry, guys, just testing!')
        })
	message.channel.stopTyping()
}

module.exports.help = {
    name: "test"
}