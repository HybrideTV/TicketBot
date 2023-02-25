const { MessageEmbed, GuildMember } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const profilDb = require('../../utils/database/profil');

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  /**
   * 
   * @param {*} client 
   * @param {GuildMember} member 
   */
  async run(client, member) {
    let createProfile = new profilDb({
        userId: member.user.id,
        userName: member.user.username,
        ticket: "0"
        });
    createProfile.save().catch(err => console.log(err)); 
  }
}