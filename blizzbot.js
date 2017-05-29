const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const blizzard = require('blizzard.js').initialize({ apikey: config.blizzapi });


client.login(config.token);
client.on('ready', () => {
  console.log('BlizzBot is ready and waiting for action!');
});


client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(' ').slice(1);

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});