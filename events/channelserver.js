const { MessageEmbed, Permissions, Collection } = require('discord.js');

module.exports = {
  name: "channelserver",
  aliases: [],
  category: "administrator",
  description: "Menampilkan Daftar Seluruh Channel di Server",
  usage: "",
  accessableby: "everyone",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      return message.reply("Kamu tidak memiliki permission **ADMINISTRATOR** untuk menggunakan command ini!");
    }

    const channels = message.guild.channels.cache.filter(channel => channel.type !== 'GUILD_PRIVATE_THREAD').sort((a, b) => a.rawPosition - b.rawPosition);

    if (channels.size === 0) {
      return message.reply("**Tidak ada channel yang ditemukan di server ini!**");
    }

    const textChannels = channels.filter((channel) => channel.type === 'GUILD_TEXT');
    const voiceChannels = channels.filter((channel) => channel.type === 'GUILD_VOICE');
    const categoryChannels = channels.filter((channel) => channel.type === 'GUILD_CATEGORY');

    const textChannelMentions = textChannels.map((channel) => channel.toString()).join("\n");
    const voiceChannelMentions = voiceChannels.map((channel) => channel.toString()).join("\n");
    const categoryChannelMentions = categoryChannels.map((channel) => channel.toString()).join("\n");

    const channelsEmbed = new MessageEmbed()
      .setTitle(`Daftar Seluruh Channel di Server ${message.guild.name}`)
      .addField('Text Channels', textChannelMentions || 'Tidak ada channel teks', true)
      .addField('Voice Channels', voiceChannelMentions || 'Tidak ada channel suara', true)
      .addField('Category Channels', categoryChannelMentions || 'Tidak ada kategori channel', true)
      .setFooter(`Total: ${channels.size} channel`)
      .setTimestamp();

    message.channel.send({ embeds: [channelsEmbed] });
  },
};
