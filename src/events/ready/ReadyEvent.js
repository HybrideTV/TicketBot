const BaseEvent = require('../../utils/structures/BaseEvent');
const config = require("../../../config.json");
const { Client, MessageButton, MessageActionRow, MessageEmbed} = require("discord.js");
const profilDb = require('../../utils/database/profil');
const discordTranscripts = require('discord-html-transcripts');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');

    client.on('interactionCreate', async(interaction) => {
    if (interaction.customId === 'closeTicket') {            
            let date = new Date();
            let month = date.getMonth() + 1;
            const attachment = await discordTranscripts.createTranscript(interaction.channel);
            const embedClose = new MessageEmbed()
                    .setTitle("TICKET FERMÉ")
            interaction.guild.channels.cache.get(`${config.channel_logs}`).send({embed: [embedClose]});
            interaction.guild.channels.cache.get(`${config.channel_logs}`).send({files: [attachment] });
            profilDb.findOneAndUpdate({ userId: interaction.channel.topic}, { ticket: 0}, function (err, docs) {
                if (err){
                    console.log(err)
                }});
                interaction.channel.delete();

        }else if (interaction.customId === 'openTicket') {
          let p = await profilDb.findOne( {userId: interaction.user.id});
          let nbTicket = p.get("ticket");
          if(nbTicket === 1){
            interaction.reply({content: 'Vous ne pouvez ouvrir un seul ticket!', ephemeral: true });
          }else{
            const TicketButtons = new MessageActionRow()
            TicketButtons.addComponents(
            new MessageButton()
            .setStyle('DANGER')
            .setLabel('Fermer')
            .setCustomId('closeTicket')) 
            var ct = interaction.guild.channels.create('ticket-' + interaction.user.username, {
                type: 'GUILD_TEXT',
                parent: `${config.categ_ticket}`,
                permissionOverwrites: [{
                        id: config.role_everyone, 
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: config.role_staff,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: interaction.user,
                        allow: ['VIEW_CHANNEL'],
                    }
                ]
            }).then(async ct => {
                const embed = new MessageEmbed()
                    .setTitle("Premier message du ticket.")
                    .setColor(0x00ffa6)
                ct.send({ embeds: [embed], components: [TicketButtons]}).then((msg) => msg.pin());
                ct.setTopic(interaction.user.id);
                interaction.reply({content: 'Votre ticket à été ouvert!', ephemeral: true });
                profilDb.findOneAndUpdate({ userId: interaction.user.id}, { ticket: 1}, function (err, docs) {
                    if (err){
                        console.log(err)
                    }});
                })
            }   
        } 
    })
}
}