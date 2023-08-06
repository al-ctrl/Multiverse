const client = require('../index.js')
const db = require("quick.db")
const { MessageEmbed } = require('discord.js');

// Event untuk mengubah pesan menjadi embed
client.on('messageCreate', async (message) => {
  if (!message.author.bot) {
    const channelq = await db.get(`autoEmbedChannel-${message.guild.id}`);

    if (channelq && message.channel.id === channelq.channel) {
      const embed = new MessageEmbed()
        .setTitle("**🍃・Quotes Today**")
        .setDescription(`**❝ ${message.content} ❞**`)
        .setFooter(`Quotes dari: ${message.author.tag} • ${message.createdAt.toLocaleString()}`)
        .setColor('PURPLE');

      const channel = message.guild.channels.cache.get(channelq.channel);
      const sentMessage = await channel.send({ embeds: [embed] });
      await db.set(`autoEmbedChannel-${message.guild.id}`, { channel: channelq.channel, description: channelq.description, message: sentMessage.id });

      message.delete().catch(console.error);
    }
  }
});

