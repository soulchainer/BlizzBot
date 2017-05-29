const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args) => {
    
    
    const embed = new Discord.RichEmbed()
        .setColor('#009911')
        .addField('WoW commands:', '?pj Name Server-Name Region \n?guild GuildName Server-Name Region')
        //.addField('OW commands:', '?ow Battletag#1234 Region')
        .addBlankField()
        .addField('More info:', 'You can use spaces in Guild Names. Regions are EU, US, etc')
        .setFooter('This bot is a Work in Progress.')
    message.channel.send({embed});
};