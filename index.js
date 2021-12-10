// get discordAPI and create an instant of it
const Discord = require('discord.js');
const client = new Discord.Client();

//got the prefix of comand and token of the bot discord
const { prefix, token } = require('./config.json');

 //file system, to read files in the project
const fs = require('fs');

//for save list of commands 
client.commands = new Discord.Collection();

//map the commands in the folder commands
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//When the bot is ready to use
client.once('ready', () => {
    console.log("IdwBot is online");
})

client.on('message', message => {

    //got the message of userDiscord 
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    //check if the message of user is a command
    if(command === 'play'){
        client.commands.get('play').execute(message, args);
    } else if (command === 'leave'){
        client.commands.get('leave').execute(message, args);
    } else if (command === 'next'){
        client.commands.get('next').execute(message, args);
    } else if (command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
})

//log the bot with his token in config.json
client.login(token);