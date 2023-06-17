const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ["ava"],
    category: "umum",
    description: "Menampilkan avatar",
    usage: "[username | nickname | mention | ID](optional)",
    accessableby: "everyone",
  run: async (client, message, args) => { 
    const target = message.mentions.users.first() || message.author;

    const response = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`${target.tag}\'s Avatar`)
    .setImage(target.displayAvatarURL ({dynamic: true, size: 4096}))
    .setFooter(`Request dari: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))

    message.reply({ embeds: [response] });
  }
}