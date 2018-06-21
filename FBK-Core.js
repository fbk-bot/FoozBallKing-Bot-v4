  /*
	Coder of FBK-Core and Command Seperation, Evaluation command, Modules:
	@CodaEnder#0001 (Developer of Spexr)
*/


// client Requirements
const Discord = require('discord.js');
const bot = new Discord.Client();
const client = bot;
const fs = require('fs');
const request = require('request');
let guildConfig = require('./data/guildConfig.json'); // Guild configurations
if(!guildConfig) {
    console.error(new Error(`Guild configuration does not exist! Please create a file named "guildConfig.json" in the folder "data".`));
    process.exit(1);
}

// GuideBot Dashboard modules
const url = require("url");
const path = require("path");
const express = require("express");
const app = express();
const moment = require("moment");
require("moment-duration-format");
const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;
const helmet = require("helmet");
const md = require("marked");

// client Configuration
const config = require("./config.json")
const prefix = (config.prefix)
const devPrefix = (config.developerPrefix)
const version = (config.version)
const Developer = ["455346525716086795", "379274926621720576", "360447689822830594", "360447689822830594", "249467130108575745", "245369326322843649"]
const defaultColor = ([])
const errorColor = [179, 0, 0]
const nopermColor = [179, 0, 0]
console.log(`FoozBallKing Bot ${version} `);
console.log(` Loading Assets...`);
bot.commandCores = new Discord.Collection();
const errorNoPerm = new Discord.RichEmbed()
.setColor(nopermColor)
.addField('**ERROR!**', 'Sorry, but you have no permission to use this command!')
let queuesL = {};
const ytkey = 'AIzaSyBBq6-Zbsq6V3PLsXCb7NCdS2TKgOoMAXQ'
const blocks = {};
let tempGuildConfig = {};

function loadCommand() {
fs.readdir("./fbk_modules/commands/", (err, files) => { // Load Core Modules
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log(" No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands!`)

  jsfiles.forEach((f, i) => {
    let props = require(`./fbk_modules/commands/${f}`);
    console.log(` ${i + 1}: ${f} command!`);
    bot.commandCores.set(props.help.name, props);
  });
});



}

function getQueueLink(server) { // Grabbed from DarkoPendragon's Music module (v1.5.1), edited to fit a queue link.
    if (!queuesL[server]) queuesL[server] = [];
    return queuesL[server];
  }
bot.on('ready', async () => {
    loadCommand();
    tempGuildConfig = guildConfig;
  console.log(`Connected`);
  console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator} | Prefix is ${prefix}`);
  console.log(`Set game to "${prefix}help - ${version}"`)
  bot.user.setPresence({game: {name: `${prefix}help - ${version}`, type: 1, url: `https://www.twitch.tv/monstercat`}});
})
.on('message', async message => {
  const msg = message.content.trim()
  // const args = message.content.split(` `).slice(1)

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  let commandCores = bot.commandCores.get(command.slice(prefix.length).toLowerCase());
  let queul = getQueueLink(message.guild.id)
	if(message.author.bot) return;
  if(msg.toLowerCase().startsWith(prefix)) {
		if(msg.toLowerCase().includes('g.leave')) return;
		if(msg.toLowerCase().includes('shutdown')) return message.channel.send('Nice try.');
	if(commandCores) {
		commandCores.run(bot, message, args, Developer, errorNoPerm, errorColor, blocks, ytkey, queul).catch(err => {
			message.channel.send(this.giveErr(err))
			bot.channels.get(`400273922723151881`).send(this.giveErr(err))
    })
    message.channel.stopTyping()
	}
	if(['gay', 'gey', 'nazi'].some(tr => msg.toLowerCase().includes(tr))) {
		message.delete()
		message.channel.send(`No u ${message.author}`)
	}
	}

	if(['60133172187', '0133172187', '133172187', '67322059', '3172187', '317 2187', '6732 2059'].some(tldr => message.content.includes(tldr))) {
		message.delete()
		message.channel.send('No numbers here :)')
	}

	if(['megat', 'ikhsan'].some(tra => msg.toLowerCase().includes(tra))) {
		message.delete()
		message.channel.send('Nein')
	}


  /*
    delete require.cache[require.resolve(`./${args[0]}.js`)];
  */
})
.on('guildMemberAdd', async member => {
    if(!tempGuildConfig[member.guild.id]) return;
    try {
        member.guild.channels.get(tempGuildConfig[member.guild.id].welcome.channel).send(`${tempGuildConfig[member.guild.id].welcome.message}`.replace('{member}', member.toString()).replace('{guild}', member.guild.name).replace('{member.noMention}', member.user.username))
    } catch (err) {
        const errorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")
        bot.channels.get('400273922723151881').send(`Error executing welcome message in ${member.guild.name} for channel ${tempGuildConfig[member.guild.id].welcome.channel}: ${errorMessage}`)
    }
})
.on('guildMemberRemove', async member => {
    if(!tempGuildConfig[member.guild.id]) return;
    try {
        member.guild.channels.get(tempGuildConfig[member.guild.id].goodbye.channel).send(`${tempGuildConfig[member.guild.id].goodbye.message}`.replace('{member}', member.toString()).replace('{guild}', member.guild.name).replace('{member.noMention}', member.user.username))
    } catch (err) {
        const errorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")
        bot.channels.get('400273922723151881').send(`Error executing welcome message in ${member.guild.name} for channel ${tempGuildConfig[member.guild.id].goodbye.channel}: ${errorMessage}`)
    }
})

bot.login(config.token);

process.on('unhandledRejection', (reason, p) => { // Thanks to Damien // CodaEnder for this :P, catches an unhandled rejection error.
	console.log('Unhandled Rejection at: ', p, ', reason:', reason);
	if(p.toString().toLowerCase().includes('error')) process.exit(1)
	})
	.on('uncaughtException', err => {
		console.error(err)
		process.exit(1)
	})

/*
const msgPong = await message.channel.send("Pinging the Discord samurai's...");
  const pingReturn = new Discord.RichEmbed()
        .setColor(defaultColor)
        .setAuthor(`Milo Miyazaki | Samurai Returned!`, client.user.avatarURL)
    .addField(`Message:`, `${msgPong.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField(`API:`, `${Math.round(client.ping)}ms`, true)
    .setFooter(`Milo Miyazaki`)
    msgPong.edit(pingReturn);
	*/

module.exports.giveErr = (error) => {
  let err = error.toString()
	let datErrTho = err.slice(theOtherType(err))
	let giveTheErrPls = new Discord.RichEmbed()
	.setColor([179, 0, 0])
	.setTitle(`Error while executing this command!`)
	.setThumbnail(bot.user.avatarURL)
	.addField(`Type of error: ${giveTypeOfErr(err)}`, '`' + datErrTho + '`')
	.setFooter(`For more information or info on how to fix this,  go to https://discord.gg/RfmJYQX`)
	console.log(error.stack.replace(new RegExp(`${__dirname}/`, "g"), "./"))
	return giveTheErrPls
}

function giveTypeOfErr(err) {
	if(err.startsWith('TypeError')) {
		return 'A Developer messed up'
	} else if(err.startsWith('Error')) {
		return 'Regular'
	} else if(err.startsWith('AssertionError')) {
		return 'Assertion'
	} else if(err.startsWith('EvalError')) {
		return 'Evaluation'
	} else if(err.startsWith('RangeError')) {
		return 'Range'
	} else if(err.startsWith('SyntaxError')) {
		return 'Syntax'
	} else if(err.startsWith('ReferenceError')) {
		return 'Undefined Reference (Another developer messup)'
	} else if(err.startsWith('URIError')) {
		return 'URI'
	} else {
		return 'Unknown'
	}
}

function theOtherType(err) {
  let errorLength = 7
  if(err.startsWith('TypeError')) {
		return Math.floor(4 + errorLength)
	} else if(err.startsWith('Error')) {
		return Math.floor(5 + 2)
	} else if(err.startsWith('AssertionError')) {
		return Math.floor(9 + errorLength)
	} else if(err.startsWith('EvalError')) {
		return Math.floor(4 + errorLength)
	} else if(err.startsWith('RangeError')) {
		return Math.floor(5 + errorLength)
	} else if(err.startsWith('SyntaxError')) {
		return Math.floor(6 + errorLength)
	} else if(err.startsWith('ReferenceError')) {
		return Math.floor(9 + errorLength)
	} else if(err.startsWith('URIError')) {
		return Math.floor(3 + errorLength)
	} else {
		return 'Unknown'
	}
}

module.exports.writeGuildConfig = async () => {
    fs.writeFile('./data/guildConfig.json', tempGuildConfig, err => {
        if (err) return err;
    })
}

/*
    From the dashboard point, this will be using AnIdiotsGuide's GuideBot Dashboard due to me
    unable to code a dashboard. Well, at least up to the point of logging in and out. 
    Gonna be HEAVILY edited, though.
    This will also include AnIdiotsGuide's comments.
    The original source code: https://github.com/AnIdiotsGuide/guidebot-class/tree/dashboard
*/

const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);

  // This resolves to: yourbotdir/dashboard/templates/ 
  // which is the folder that stores all the internal template files.
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

  // The public data directory, which is accessible from the *browser*. 
  // It contains all css, client javascript, and images needed for the site.
  app.use("/public", express.static(path.resolve(`${dataDir}${path.sep}public`)));

  // These are... internal things related to passport. Honestly I have no clue either.
  // Just leave 'em there.
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  /* 
  This defines the **Passport** oauth2 data. A few things are necessary here.
  
  clientID = Your bot's client ID, at the top of your app page. Please note, 
    older bots have BOTH a client ID and a Bot ID. Use the Client one.
  clientSecret: The secret code at the top of the app page that you have to 
    click to reveal. Yes that one we told you you'd never use.
  callbackURL: The URL that will be called after the login. This URL must be
    available from your PC for now, but must be available publically if you're
    ever to use this dashboard in an actual bot. 
  scope: The data scopes we need for data. identify and guilds are sufficient
    for most purposes. You might have to add more if you want access to more
    stuff from the user. See: https://discordapp.com/developers/docs/topics/oauth2 

  See config.js.example to set these up. 
  */
  passport.use(new Strategy({
    clientID: config.botID,
    clientSecret: config.oauthSecret,
    callbackURL: config.callbackURL,
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  
  // Session data, used for temporary storage of your visitor's session information.
  // the `secret` is in fact a "salt" for the data, and should not be shared publicly.
  app.use(session({
    store: new LevelStore("./data/dashboard-session/"),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }));

  // Initializes passport and session.
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  // The domain name used in various endpoints to link between pages.
  app.locals.domain = config.domain;
  
  // The EJS templating engine gives us more power to create complex web pages. 
  // This lets us have a separate header, footer, and "blocks" we can use in our pages.
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  // body-parser reads incoming JSON or FORM data and simplifies their
  // use in code.
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 

  /* 
  Authentication Checks. For each page where the user should be logged in, double-checks
  whether the login is valid and the session is still active.
  */
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  // This function simplifies the rendering of the page, since every page must be rendered
  // with the passing of these 4 variables, and from a base path. 
  // Objectassign(object, newobject) simply merges 2 objects together, in case you didn't know!
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };


  /** PAGE ACTIONS RELATED TO SESSIONS */

  // The login page saves the page the person was on in the session,
  // then throws the user to the Discord OAuth2 login page.
  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  // Once the user returns from OAuth2, this endpoint gets called. 
  // Here we check if the user was already on the page and redirect them
  // there, mostly.
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), (req, res) => {
    if (req.user.id === client.appInfo.owner.id) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });
  
  // If an error happens during authentication, this is what's displayed.
  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
  });

  // Destroys the session to log out the user.
  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/"); //Inside a callback… bulletproof!
    });
  });

  /** REGULAR INFORMATION PAGES */

  // Index page. If the user is authenticated, it shows their info
  // at the top right of the screen.
  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });

  // Simple redirect to the "Settings" page (aka "manage")
  app.get("/dashboard/:guildID", checkAuth, (req, res) => {
    res.redirect(`/dashboard/${req.params.guildID}/manage`);
  });

  app.get("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/manage.ejs", {guild});
  });

  // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    tempGuildConfig[guild.id] = req.body;
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });

app.listen(6007); // Get it? Cuz on my BlackBerry phone, F = 6 and Z = 7, so 6007 = FOOZ
// For Glitch, however, you require to replace "6007" with "process.env.PORT"
// I have no idea why, but it's sad