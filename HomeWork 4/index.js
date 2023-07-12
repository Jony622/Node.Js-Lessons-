const { Client, Collection, Events, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
let mongoose = require('mongoose');
const User = require('./models/users');
app.set("view engine", "ejs");

let token = config.token

client.commands = new Collection()
client.slashcommands = new Collection()
client.commandaliases = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

const log = x => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`) };

//command-handler
const commands = []
readdirSync('./src/commands/normal').forEach(async file => {
  const command = await require(`./src/commands/normal/${file}`);
  if(command) {
    client.commands.set(command.name, command)
    commands.push(command.name, command);
    if(command.aliases && Array.isArray(command.aliases)) {
       command.aliases.forEach(alias => {
        client.commandaliases.set(alias, command.name)  
})
}}})

//slash-command-handler
const slashcommands = [];
readdirSync('./src/commands/slash').forEach(async file => {
  const command = await require(`./src/commands/slash/${file}`);
  slashcommands.push(command.data.toJSON());
  await client.slashcommands.set(command.data.name, command);
})

client.on(Events.ClientReady, async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: slashcommands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} AI ready!`);
})

//event-handler
readdirSync('./src/events').forEach(async file => {
	const event = await require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})

  client.on("voiceStateUpdate", async function(oldState, newState){
      let personal = await User.findOne({id:newState.member.user.id});
    if(!oldState.channel && newState.channel){
        let start = Date.now();
      if (personal == null) {
        let newUser = new User({
            id: newState.member.user.id,
            username: newState.member.user.username,
            startdate: start,
            enddate: 0,
            spenttime: 0
        });
        await newUser.save();
      }
        await User.findOneAndUpdate({id: newState.member.user.id}, {startdate: start  }, {returnOriginal: false});
    } else if(!newState.channel){
        let end = Date.now();
        let t = end - personal.startdate;
          await User.findOneAndUpdate({id: newState.member.user.id}, {enddate: end }, {returnOriginal: false});
          await User.findOneAndUpdate({id: newState.member.user.id}, {spenttime: t }, {returnOriginal: false});

    }
    });

client.on("messageCreate",async (message)=> {
    const [command, ...args] = message.content.split(/ +/);
      let devTestid = '1123531125218873444';
      let betaTestid = '1123543325044134000';
      let sk = '1125492865246695614';
    if (message.author.bot) {
      return;
    };
    if (message.channel.id === devTestid || message.channel.id === betaTestid || message.channel.id === sk){
      if (message.content == '!todo fuck Jony`s bot' || message.content == '!todo fuck you' ||
      message.content == '!t fuck Jony`s bot' || message.content == '!t fuck you') {
        message.channel.send("try me bitch \n")
        return message.channel.send(`https://tenor.com/view/middle-finger-fuck-you-flip-off-fu-gif-14205709`);
    } else if (command == "!clear") {
        message.channel.bulkDelete(100).then(() => {
        message.channel.send("Deleted 100 messages.").then(msg => msg.delete(3000));
});
    } else if (command == "!time") {
        message.delete();
        let personal = await User.findOne({id:message.author.id});
        let seconds = Math.floor((personal.spenttime / 1000) % 60);
        let minutes = Math.floor((personal.spenttime / 1000 / 60) % 60);
        let hours = Math.floor((personal.spenttime / 1000 / 60 / 60) % 24);
        let days = Math.floor(personal.spenttime / 1000 / 60 / 60 / 24);
        return message.channel.send(`${message.author}, You spent time at voice: **${days}** d., **${hours}** h., **${minutes}** m., **${seconds}** s.`);
    } else if (command == "!todo" || command == "!t") {
    let personal = await User.findOne({id:message.author.id});
      if (personal == null) {
        let newUser = new User({
            username: message.author.username,
            id: message.author.id,
            todo: []
        });
        await newUser.save();
      }
      if (args == 0) {
      message.delete();
      return message.channel.send("todo what??");
      }
    message.delete();
    let argJ = args.join(' ');
      await User.findOneAndUpdate({id: message.author.id}, { $push: { todo: argJ } }, {returnOriginal: false});
      return message.channel.send("todo added successfully");
    } else if (command == "!showtodo" || command == "!st") {
    let list = await User.findOne({id:message.author.id});
      if (list == null || list.todo == 0) {
        message.delete();
        return message.member.send("Your todo list empty!!")
      }
      message.delete();
    let mes = "";
      for (let i = 0; i < list.todo.length; i++) {
      mes += i+1+" "+list.todo[i] + "\n";
      }
      return message.member.send(`${mes}`);
    } else if (command == "!deletetodo" || command == "!dt") {
      if (args == 0) {
        message.delete();
        return message.channel.send("delete what??");
      } 
      if (isNaN(args)) {
        message.delete();
        return message.channel.send("write number of todo!!");
      }
    let list = await User.findOne({id:message.author.id});
      if (list == null || list.todo == 0) {
        message.delete();
        return message.channel.send("Your todo list empty");
      }
      message.delete();
    let newTodoarr = list.todo;
    let removed = list.todo.splice(args -1, args.length);
      await User.findOneAndUpdate({id: message.author.id}, {todo: newTodoarr  }, {returnOriginal: false});
      return message.channel.send(`${removed} - was deleted`);
    }
// start general----------------------------------------------------------------------------------------
    else if ( message.member._roles.find(e => e === '1124747927110295613') == '1124747927110295613' ||
      message.member._roles.find(e => e === '1124737025661210624') == '1124737025661210624' ||
      message.member._roles.find(e => e === '873575556120186973') == '873575556120186973') {
    if (command == "!gtodo" || command == "!gt") {
    let personal = await User.findOne({role: message.member._roles});
      if (personal == null) {
        let newUser = new User({
            role: '873575556120186973',
            todo: []
        });
        await newUser.save();
      }
      if (args == 0) {
        return message.channel.send("todo what??");
      }
    let argJ = args.join(' ');
        await User.findOneAndUpdate({role: '873575556120186973'}, { $push: { todo: argJ } }, {returnOriginal: false});
        return message.channel.send("todo added successfully");
    } else if (command == "!gshowtodo" || command == "!gst") {
    let list = await User.findOne({role: '873575556120186973'});
      if (list == null || list.todo == 0) {
        return message.channel.send("Your todo list empty!!");
      }
    let mes = "";
      for (let i = 0; i < list.todo.length; i++) {
        mes += i+1+" "+list.todo[i] + "\n";
      }
        return message.channel.send(`${mes}`);
    } else if (command == "!gdeletetodo" || command == "!gdt") {
      if (args == 0) {
        return message.channel.send("delete what??");
      } 
      if (isNaN(args)) {
        return message.channel.send("write number of todo!!");
      }
      let list = await User.findOne({role: '873575556120186973'});
      if (list == null || list.todo == 0) {
        return message.channel.send("Your todo list empty");
      }
    let newTodoarr = list.todo;
    let removed = list.todo.splice(args -1, args.length);
        await User.findOneAndUpdate({role: '873575556120186973'}, {todo: newTodoarr  }, {returnOriginal: false});
        return message.channel.send(`${removed} - was deleted`);
    }
// end -----------------------------------------------------------------------------------------------------------------
    }
    // general without role ------------------------------------------------------------------------------------------------
    else if ( message.member._roles.find(e => e === '1124747927110295613') != '1124747927110295613' ||
        message.member._roles.find(e => e === '1124737025661210624') != '1124737025661210624' ) {
      if (command == "!gtodo" || command == "!gt") {
        return message.channel.send("You dont have <General todo> role ");
    } else if (command == "!gshowtodo" || command == "!gst") {
        return message.channel.send("You dont have <General todo> role");
    } else if (command == "!gdeletetodo" || command == "!gdt") {
        return message.channel.send("You dont have <General todo> role");
    }
}
// end ---------------------------------------------------------------------------------------------------------
    const randGif = [
    "https://tenor.com/view/spongebob-rainbow-imagination-meme-idc-gif-17331659",
    "https://tenor.com/view/hmm-blink-idc-whatever-who-cares-gif-17565003",
    "https://tenor.com/view/going-crazy-willem-dafoe-grin-smile-gif-16959907",
    "https://tenor.com/view/theodoros-gif-18432147",
    "https://tenor.com/view/cat-bed-laying-lazy-dzekas-gif-20013760",
    "https://tenor.com/view/dog-smile-shyboos-smile-gif-24233810"
  ];
    const randomG = randGif[Math.floor(Math.random() * (randGif.length - 1)) + 1];
    message.channel.send(`${randomG}`);
    } return;
  });

process.on("unhandledRejection", e => { 
   console.log(e)
 }) 
process.on("uncaughtException", e => { 
   console.log(e)
 })  
process.on("uncaughtExceptionMonitor", e => { 
   console.log(e)
 })
//

    client.login(token)

    app.get('/', async (req, res) => {
    let user = await User.find({});
    res.render ('main', {userBase: user})
      });


async function start(){
await mongoose.connect("mongodb+srv://Jony:2222@cluster0.h5dfcpt.mongodb.net/?retryWrites=true&w=majority");
app.listen(3000, () => console.log("Сервер запущен..."));
}
start();