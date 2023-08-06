/*const { MessageEmbed } = require('discord.js');
const jsonQuotes = require('../../motivational.json');

module.exports = {
  data: {
    name: 'motivation',
    aliases: ['motivate', 'motivational'],
    description: 'Get a random motivational quote',
    category: "fun",
    usage: "[username | nickname | mention | ID](optional)",
    accessableby: "everyone"
  },
  run: async (interaction) => {
    const { options, guild } = interaction;
    const member = options.getMember('user') || interaction.member;

    const randomQuote = jsonQuotes.quotes[Math.floor(Math.random() * jsonQuotes.quotes.length)];
    
    const quoteEmbed = new MessageEmbed()
      .setAuthor(guild.name, guild.iconURL())
      .setTitle(randomQuote.author)
      .setDescription(randomQuote.text)
      .setColor('GREEN')
      .setFooter(member.displayName, member.user.displayAvatarURL())
      .setTimestamp();

    if (options.getMember('user')) {
      quoteEmbed
        .setTitle(`${randomQuote.author} -`)
        .setDescription(`**${randomQuote.text}**\n\nBy ${interaction.member.displayName} to ${member.displayName}`);
    }

    interaction.reply({ embeds: [quoteEmbed] });
  }
};*/
