const Discord = require('discord.js');
const config = require('../config.json');
const blizzard = require('blizzard.js').initialize({ apikey: config.blizzapi });
exports.run = (client, message, args) => {
    
    if (args.length != 3){
      message.channel.send('Wrong input, type ?help for help!')
      return;
    };

    let name = args[0];
    let server = args[1];
    let region = args[2];

    blizzard.wow.character(['profile', 'guild', 'items'], { origin: region, realm: server, name: name })
    .then(response => {
        let respuesta = response.data;
    
        // Para determinar y asignar el nombre de la clase.
        switch (respuesta['class']){
            case 1:
                respuesta['class'] = 'Warrior';
                break;
            case 2:
                respuesta['class'] = 'Paladin';
                break;
            case 3:
                respuesta['class'] = 'Hunter';
                break;
            case 4:
                respuesta['class'] = 'Rogue';
                break;
            case 5:
                respuesta['class'] = 'Priest';
                break;
            case 6:
                respuesta['class'] = 'Death Knight';
                break;
            case 7:
                respuesta['class'] = 'Shaman';
                break;
            case 8:
                respuesta['class'] = 'Mage';
                break;
            case 9:
                respuesta['class'] = 'Warlock';
                break;
            case 10:
                respuesta['class'] = 'Monk';
                break;
            case 11:
                respuesta['class'] = 'Druid';
                break;
            case 12:
                respuesta['class'] = 'Demon Hunter';
                break;
        };

    // Para determinar la raza.
        switch (respuesta['race']){
            case 1:
                respuesta['race'] = 'Human';
                break;
            case 2:
                respuesta['race'] = 'Orc';
                break;
            case 3:
                respuesta['race'] = 'Dwarf';
                break;
            case 4:
                respuesta['race'] = 'Night Elf';
                break;
            case 5:
                respuesta['race'] = 'Undead';
                break;
            case 6:
                respuesta['race'] = 'Tauren';
                break;
            case 7:
                respuesta['race'] = 'Gnome';
                break;
            case 8:
                respuesta['race'] = 'Troll';
                break;
            case 9:
                respuesta['race'] = 'Goblin';
                break;
            case 10:
                respuesta['race'] = 'Blood Elf';
                break;
            case 11:
                respuesta['race'] = 'Draenei'
                break;
            case 22:
                respuesta['race'] = 'Worgen';
                break;
            case 25:
                respuesta['race'] = 'Pandaren';
                break;
            case 26:
                respuesta['race'] = 'Pandaren';
                break;
        };
    
        // Para deterimar la facción:
        let color;
        if (respuesta['faction'] == 0) {
            respuesta['faction'] = 'Alliance';
            color = '#1560d8';
        }else{
            respuesta['faction'] = 'Horde';
            color = '#b71b1b';
        };
        
        //  Para determinar género.
        if (respuesta['gender'] == 0){
            respuesta['gender'] = '&#9794';
        }else{
            respuesta['gender'] = '&#9792;';
        };

        // No guild error handle.
        let guildname;
        if (respuesta['guild'] == undefined){
            guildname = respuesta['name'] + ' hasn\'t joined a guild yet';
        }else{
            guildname = respuesta['guild'].name;
        }
        
        // No ilvl error handle.
        if (respuesta['items'].averageItemLevelEquipped == undefined) {
            respuesta['items'].averageItemLevelEquipped = 'No ilvl info at the moment';
        };

        console.log(respuesta['name']);

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setThumbnail('http://render-api-' + region + '.worldofwarcraft.com/static-render/' + region + '/' + respuesta['thumbnail'])
            .addField(respuesta['name'] + ', level ' + respuesta['level'] + ' ' + respuesta['race'] + ' ' + respuesta['class'], '[Armory page.](https://worldofwarcraft.com/character/'+server+'/'+name+')')
            .addField('Equipped ilvl:', respuesta['items'].averageItemLevelEquipped, true)
            .addField('Faction:', respuesta['faction'],true)
            .addField('Guild:', guildname, true)

        message.channel.send({embed});

    });
};