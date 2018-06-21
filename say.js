	var stdin = process.openStdin();
	const config = require('./config/config.json')
	const Discord = require('discord.js')
	const bot = new Discord.Client()
	const chalk = require('chalk')
	// Channel lists
	const currentChannel = '241770628175233024' // Set this to the channel you want.
console.log(`Terminal ready!`);
stdin.addListener("data", function(code) {
	let saytxt = code.toString()
	bot.channels.get(currentChannel).startTyping()
    bot.channels.get(currentChannel).send(saytxt)
	bot.channels.get(currentChannel).stopTyping()
});
   
   bot.on('message', async msg => {
	   if(msg.channel.id == currentChannel) {
		   console.log(chalk.green(`${msg.author.tag}: ${msg.content}`))
	   }
   })
   .on('ready', async () => {
	   console.log('Ready!')
   })
   
   bot.login(config.token)