const { MessageEmbed } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const profilDb = require('../../utils/database/profil');

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }
  
  async run(client, member) {
    profilDb.findOneAndRemove({ userId: member.user.id }, 
        function(err){
            if(err){
                console.log(err)
            }
        });
  }
}