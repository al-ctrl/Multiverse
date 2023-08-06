const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'confession',
  aliases: ["confess"],
  run: async function (client, message, args, prefix) {
    // Membuat row yang berisi dua tombol
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('confess_anonymous')
          .setLabel('Confess Anonymously')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('confess_named')
          .setLabel('Confess with Name')
          .setStyle('PRIMARY'),
      );

    // Mengirim pesan awal
    message.channel.send({
      content: 'Welcome to the Confession Booth! Please select an option:',
      components: [row],
    });
  }
};
