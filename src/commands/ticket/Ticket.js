const BaseCommand = require('../../utils/structures/BaseCommand');
const { Message, Client } = require("discord.js");

module.exports = class Ticket extends BaseCommand {
    constructor() {
        super('ticket', 'ticket', []);
    }
    async run(client, msg, args) {
        let target = msg.mentions.members.first() || msg.guild.members.cache.get(args[1])
        if(args[0] === 'add'){
            msg.channel.permissionOverwrites.edit(target, { VIEW_CHANNEL: true });
            msg.channel.send(`${target} a été ajouté au ticket !`);
    }else if(args[0] === 'remove'){
            msg.channel.permissionOverwrites.edit(target, { VIEW_CHANNEL: false });
            msg.channel.send(`${target} a été supprimé du ticket !`);
    }
    }
};