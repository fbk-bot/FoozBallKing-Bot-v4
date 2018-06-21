const Discord = require('discord.js')
const ytdl = require('ytdl-core');
const { YTSearcher } = require('ytsearcher');
const ypi = require('youtube-playlist-info');
/**
	* @param {Client} client - Discord Client
	* @param {Message} message - Discord Message
	* @param {object} options - Options
*/

function music(client, options) {
	const prefix = (options && options.prefix) || '!'; // If you defined your prefix, use that prefix, else use already-set prefix.
const ytkey = (options && options.ytkey); // REQUIRED!
const helpCmd = (options && options.helpCmd) || 'help';
const playCmd = (options && options.playCmd) || 'play';
const pauseCmd = (options && options.pauseCmd) || 'pause';
const stopCmd = (options && options.stopCmd) || 'stop';
const queueCmd = (options && options.queueCmd) || 'queue';
const npCmd = (options && options.npCmd) || 'np';
const skipCmd = (options && options.skipCmd) || 'skip';
const resumeCmd = (options && options.resumeCmd) || 'resume';
const downloadVid = (options && options.downloadVid) || false;
const leaveCmd = (options && options.leaveCmd) || 'leave';
let queuesL = {};
const admins = []; // Admin array, for eval.


// Important config detection
if(typeof prefix !== 'string') {
	console.error(new TypeError('Prefix must be a string!'))
	process.exit(1)
} else if(prefix.includes(' ')) {
	console.error(new TypeError('Prefix can\'t be spaced out! Will attempt to fix soon.'))
	process.exit(1)
} else if(prefix == null) {
	console.error(new TypeError('No prefix!'))
	process.exit(1)
}


	if(typeof ytkey !== 'string') {
		console.error(new TypeError('YT API v3 key must be a string!'))
		process.exit(1)
	} else if(!ytkey) {
		console.error(new TypeError('No YT API v3 key!'))
		process.exit(1)
	} else if(!ytkey.includes('-')) {
		console.error(new TypeError('YT API v3 key seems invalid!'))
		process.exit(1)
	}

if(typeof helpCmd !== 'string') {
	console.error(new TypeError('Help command must be a string!'))
	process.exit(1)
}
if(typeof playCmd !== 'string') {
	console.error(new TypeError('Play command must be a string!'))
	process.exit(1)
}

if(typeof pauseCmd !== 'string') {
	console.error(new TypeError('Pause command must be a string!'))
	process.exit(1)
}
if(typeof stopCmd !== 'string') {
	console.error(new TypeError('Stop command must be a string!'))
	process.exit(1)
}
if(typeof npCmd !== 'string') {
	console.error(new TypeError('Now Playing command must be a string!'))
	process.exit(1)
}

if(typeof queueCmd !== 'string') {
	console.error(new TypeError('Queue command must be a string!'))
	process.exit(1)
}

if(typeof skipCmd !== 'string') {
	console.error(new TypeError('Skip command must be a string!'))
	process.exit(1)
}

if(typeof resumeCmd !== 'string') {
	console.error(new TypeError('Resume command must be a string!'))
	process.exit(1)
}

if(typeof downloadVid !== 'boolean') {
	console.error(new TypeError('downloadVid configuration must be a boolean! (true/false)'))
	process.exit(1)
}

if (process.version.slice(1).split('.')[0] < 8) { // NodeJS version check, deprived from DarkoPendragon's module
    console.error(new Error(`NodeJS v8 or higher is needed, please update for everything to work!`));
    process.exit(1);
  };

const searcher = new YTSearcher({ // For searching.
	key: ytkey,
	revealkey: true
})

	function getQueueLink(server) { // Grabbed from DarkoPendragon's Music module (v1.5.1), edited to fit a queue link.
		if (!queuesL[server]) queuesL[server] = [];
		return queuesL[server];
	}
	
	function help(message) { // Change help
		const argus = message.content.toLowerCase().split(' ')
		const suffix = argus.slice(1).join(' ')
		// You may edit this entire code to fit with your bot.
		if(!suffix) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.setTitle(`${client.user.username} music help!`)
			.addField(helpCmd, 'Music help!')
			.addField(playCmd, 'Play music!')
			.addField(pauseCmd, 'Pauses the queue.')
			.addField(stopCmd, 'Stops the queue (Clears queue)')
			.addField(npCmd, 'Shows the current playing song!')
			.addField(queueCmd, 'Shows the queue!')
			.addField(skipCmd, 'Skips a song! You can select how many songs to skip!')
			.addField(resumeCmd, 'Resumes the queue!')
			message.channel.send(embed)
		} else if(suffix == helpCmd) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.addField(helpCmd, 'Gets the music help for you.')
			message.channel.send(embed)
		} else if(suffix == playCmd) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.addField(playCmd, 'Play the song (URL, searching). Must be in VC.')
			message.channel.send(embed)
		} else if(suffix == pauseCmd) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.addField(pauseCmd, 'Pause the queue!')
			message.channel.send(embed)
		} else if(suffix == stopCmd) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.addField(stopCmd, 'Stop your queue. Must be in VC.')
			message.channel.send(embed)
		} else if(suffix == npCmd) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.addField(npCmd, 'Check what is playing right now!')
			message.channel.send(embed)
		} else if(suffix == queueCmd) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.addField(queueCmd, 'Check what\'s up in the queue!')
			message.channel.send(embed)
		} else if(suffix == skipCmd) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.addField(skipCmd, `Skip songs! Usage: ${prefix}${skipCmd} <songs amount>`)
			message.channel.send(embed)
		} else if(suffix == resumeCmd) {
			const embed = new Discord.RichEmbed()
			.setColor([0, 255, 0])
			.setThumbnail(client.user.avatarURL)
			.addField(resumeCmd, 'Resume the queue!')
			message.channel.send(embed)
		} else {
			const embed = new Discord.RichEmbed()
			.setColor([179, 0, 0])
			.setThumbnail(client.user.avatarURL)
			.addField('**ERROR!**', `Sorry, but ${prefix}${suffix}} is not a command!`)
		}
	}
	
	function play(message, args) { // Play function
		if(!args) return message.channel.send('No arguments defined!')
		const httpTypes = ['http://', 'https://']
			if(httpTypes.some(ht => args[0].includes(ht))) {
				if(!args[0].includes('youtube.com')) return message.channel.send(`This definitely isn't a YT link... We don't have support for other links yet.`)
				const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id)
				const queul = getQueueLink(message.guild.id)
				ytdl.getInfo(args[0], (err, info) => { 
				queul.push({
					url: args[0],
					title: info.title,
					creator: info.author.name,
					requester: message.author.tag,
					thumbnail: info.thumbnail_url,
					creator_url: info.channel_url
				})
					const embed = new Discord.RichEmbed()
		.setColor([0, 255, 0])
		.setThumbnail(info.thumbnail_url)
		.addField(`Added to queue:`, `[${info.title}](${args[0]}) by [${info.author.name}](${info.author.channel_url})`)
		.setFooter(`Requested by ${message.author.tag}!`)
		message.channel.send(embed)
				})
				if(queul.length === 0 || !client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id)) execQueueLink(message)
			} else {
				const queul = getQueueLink(message.guild.id)
				searcher.search(args.join(" "), { type: 'video' }).then(searchResult => {
          if (!searchResult.totalResults || searchResult.totalResults === 0) return message.channel.send('Failed to get search results.');
		  const result = searchResult.first
			ytdl.getInfo(result.url, (err, info) => {
				queul.push({
					url: result.url,
					title: info.title,
					creator: info.author.name,
					requester: message.author.tag,
					thumbnail: result.thumbnails.high.url,
					creator_url: info.author.channel_url
				})
				const embed = new Discord.RichEmbed()
		.setColor([0, 255, 0])
		.setThumbnail(result.thumbnails.high.url)
		.addField(`Added to queue:`, `[${info.title}](${args[0]}) by [${info.author.name}](${info.author.channel_url})`)
		.setFooter(`Requested by ${message.author.tag}!`)
		message.channel.send(embed)
			})
          if (queul.length === 0 || !client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id)) execQueueLink(message);
        });
			}
		}
	
	function execQueueLink(message) { // Execute the queue
		const queul = getQueueLink(message.guild.id)
		if (queul.length < 0) {
			message.channel.send('Playback finished.');
			// Leave the voice channel.
			const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
			if (voiceConnection !== null) return voiceConnection.disconnect();
		}
		new Promise((resolve, reject) => {
		const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id)
      if (voiceConnection == null) {
        if (message.member.voiceChannel && message.member.voiceChannel.joinable) {
          message.member.voiceChannel.join().then(connection => {
            resolve(connection);
          }).catch((error) => {
            console.error(error);
          });
        } else if (!message.member.voiceChannel.joinable) {
          message.channel.send('I don\'t have permission to join your voice channel!')
          reject();
        } else {
          queul.splice(0, queul.length);
          reject();
        }
      } else {
        resolve(voiceConnection);
      }
    }).then(connection => {
		const embed = new Discord.RichEmbed()
		.setColor([255, 0, 0])
		.setThumbnail(queul[0].thumbnail)
		.addField(`Now playing:`, `[${queul[0].title}](${queul[0].url}) by [${queul[0].creator}](${queul[0].creator_url})`)
		.setFooter(`Requested by ${queul[0].requester}!`)
		message.channel.send(embed)
		let dispatcher = connection.playStream(ytdl(queul[0].url, {filter: 'audioonly'}))
		connection.on('error', error => {
			message.channel.send(`Dispatcher or connection error occured: ${error}`)
			queul.shift()
		})
		
		dispatcher.on('error', error => {
			message.channel.send(`Dispatcher error occured: ${error}`)
			queul.shift()
		})
		
		dispatcher.on('end', () => {
			setTimeout(() => {
				if(queul.length > 0) {
					queul.shift()
					execQueueLink(message, queul)
				} else {
					queul.shift()
					message.channel.send('Queue is now empty! Leaving the voice channel...')
					leave(message)
				}
			}, 1000)
		})
	})
	}
	
	function leave(message) { // Leave the VC.
		const voiceCon = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
		if(!message.guild.members.get(message.author.id).roles.find('name', 'DJ')) return message.channel.send('You don\'t have the DJ role!')
		if(voiceCon == null) {
			message.channel.send('I\'m already out of a voice channel!')
		} else {
			voiceCon.disconnect()
			message.channel.send('Left voice channel.')
			message.channel.send('May have rejoined, try that again if so!')
		}
	}
	
	
	function queue(message) { // Check the queue.
		const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
		if (voiceConnection == null) return message.channel.send('Not playing music!')
		const queul = getQueueLink(message.guild.id)
			const text = queul.map((video, index) => (
				(index + 1) + ': ' + video.title
			)).join('\n');
			message.channel.send('Queue:\n' + text)
	}
	

function np(message) { // Now playing.
	const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
		if (voiceConnection == null) return message.channel.send('Not playing music!')
	const queul = getQueueLink(message.guild.id)
		const embed = new Discord.RichEmbed()
		.setColor([255, 0, 0])
		.setThumbnail(queul[0].thumbnail)
		.addField(`Now playing:`, `[${queul[0].title}](${queul[0].url}) by [${queul[0].creator}](${queul[0].creator_url})`)
		.setFooter(`Requested by ${queul[0].requester}!`)
		message.channel.send(embed)
}

function skip(message, args) {
	const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
	if (voiceConnection == null) return message.channel.send('Not playing music!')
	const queul = getQueueLink(message.guild.id)
	if(!message.guild.members.get(message.author.id).roles.find('name', 'DJ')) return message.channel.send('You don\'t have the DJ role!')
	let sum = 1
	if(!isNaN(args) && parseInt(args.join(" ")) > 0) {
		sum = parseInt(args.join(" "))
	}
	sum = Math.min(sum, queul.length)

	queul.splice(0, sum - 1)

	const dispatcher = voiceConnection.player.dispatcher;
		if (voiceConnection.paused) dispatcher.resume();
		dispatcher.end();
	message.channel.send(`Skipped ${sum} songs!`)
}

function stop(message) {
	const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
	if (voiceConnection == null) return message.channel.send('Not playing music!')
		if(!message.guild.members.get(message.author.id).roles.find('name', 'DJ')) return message.channel.send('You don\'t have the DJ role!')
		const queul = getQueueLink(message.guild.id)
	queul.splice(0, queul.length)
		const dispatcher = voiceConnection.player.dispatcher;
	if(voiceConnection.paused) dispatcher.resume()
		dispatcher.end()
}

function pause(message) {
	const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
	if (voiceConnection == null) return message.channel.send('Not playing music!')
		if(!message.guild.members.get(message.author.id).roles.find('name', 'DJ')) return message.channel.send('You don\'t have the DJ role!')
		const dispatcher = voiceConnection.player.dispatcher;
	if(voiceConnection.paused) {
		message.channel.send('Already paused!')
	} else {
		dispatcher.pause()
	}
}

function resume(message) {
	const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
	if (voiceConnection == null) return message.channel.send('Not playing music!')
		if(!message.guild.members.get(message.author.id).roles.find('name', 'DJ')) return message.channel.send('You don\'t have the DJ role!')
		if(!voiceConnection.paused) {
			message.channel.send('Already playing!')
		} else {
			const dispatcher = voiceConnection.player.dispatcher;
			dispatcher.resume()
		}
}
process.on('unhandledRejection', (reason, p) => { // Thanks to Damien // CodaEnder for this :P, catches an unhandled rejection error.
  console.log('Unhandled Rejection at: ', p, ', reason:', reason);
});

client.on('message', message => {
	const m = message.content.toLowerCase()
	if(m.startsWith(prefix + playCmd)) 
    return play(message)
  else if(m.startsWith(prefix + helpCmd))
    return help(message)
  else if(m.startsWith(prefix + leaveCmd))
    return leave(message)
  else if(m.startsWith(prefix + queueCmd))
    return queue(message)
  else if(m.startsWith(prefix + npCmd))
    return np(message)
  else if(m.startsWith(prefix + skipCmd))
    return skip(message)
  else if(m.startsWith(prefix + stopCmd))
    return stop(message)
  else if(m.startsWith(prefix + pauseCmd))
    return pause(message)
  else if(m.startsWith(prefix + resumeCmd))
    return resume(message)
})

}

module.exports = music