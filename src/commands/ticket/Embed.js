const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client, MessageButton, MessageActionRow } = require("discord.js");

module.exports = class Embed extends BaseCommand {
  constructor() {
    super('embed', 'ticket', []);
  }

  run(client, msg, args) {

    const Buttons = new MessageActionRow()
    Buttons.addComponents(
      new MessageButton()
      .setStyle('SUCCESS')
      .setLabel('Ouvrir')
      .setCustomId('openTicket')
    )
   let commentaires = args.join(" ");
   if(commentaires){
    const ticketEmbed = new MessageEmbed()
    .setTitle('Ouvrir un ticket')
    .setDescription('Cliquez sur le bouton pour ouvrir un ticket.')
    .setColor('RANDOM')
    .addFields(
      {name: "Commandes disponibles :", value: "?ticket add \n?ticket remove"},
      {name: 'Informations :', value: `> ${commentaires}`}
    )  
    msg.channel.send({embeds: [ticketEmbed], components: [Buttons]});
   }else{
    const ticketEmbedB = new MessageEmbed()
    .setTitle('Ouvrir un ticket')
    .setDescription('Cliquez sur le bouton pour ouvrir un ticket.')
    .setColor('RANDOM')
    
    msg.channel.send({embeds: [ticketEmbedB], components: [Buttons]});

   }
  }
}