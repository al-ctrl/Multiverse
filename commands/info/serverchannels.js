const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "serverchannels",
  aliases: ['channels', 'allchannels'],
  category: "info",
  description: "Menampilkan Daftar Seluruh Channel di Server",
  usage: "",
  accessableby: "everyone",
  run: async (client, message, args) => {
    const channels = message.guild.channels.cache.filter(channel => channel.type !== 'GUILD_PRIVATE_THREAD');

    if (channels.size === 0) {
      return message.reply("**Tidak ada channel yang ditemukan di server ini!**");
    }

    const sortedChannels = channels.sort((a, b) => a.rawPosition - b.rawPosition); // Menyortir channel berdasarkan posisi

    const channelChunks = chunkArray([...sortedChannels.values()], 10); // Membagi channel menjadi kelompok berukuran 10

    const embedArray = channelChunks.map((chunk, index) => {
      const textChannels = chunk.filter(channel => channel.type === 'GUILD_TEXT').map(channel => `**Text Channel:** ${channel.name}`);
      const voiceChannels = chunk.filter(channel => channel.type === 'GUILD_VOICE').map(channel => `**Voice Channel:** ${channel.name}`);
      const categoryChannels = chunk.filter(channel => channel.type === 'GUILD_CATEGORY').map(channel => `**Category:** ${channel.name}`);
      const description = [...textChannels, ...voiceChannels, ...categoryChannels].join("\n");

      const embed = new MessageEmbed()
        .setTitle(`Daftar Seluruh Channel di Server ${message.guild.name} (Halaman ${index + 1}/${channelChunks.length})`)
        .setDescription(description)
        .setFooter(`Total: ${channels.size} channel`)
        .setTimestamp();
      return embed;
    });

    let currentPage = 0;
    const channelsEmbed = await message.reply({ embeds: [embedArray[currentPage]] });

    // Menambahkan reaksi untuk navigasi halaman
    await channelsEmbed.react('⬅️');
    await channelsEmbed.react('➡️');

    const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = channelsEmbed.createReactionCollector({ filter, time: 60000 });

    collector.on('collect', async (reaction) => {
      try {
        if (reaction.emoji.name === '⬅️') {
          if (currentPage > 0) {
            currentPage--;
            await channelsEmbed.edit({ embeds: [embedArray[currentPage]] });
          }
        } else if (reaction.emoji.name === '➡️') {
          if (currentPage < embedArray.length - 1) {
            currentPage++;
            await channelsEmbed.edit({ embeds: [embedArray[currentPage]] });
          }
        }
        await reaction.users.remove(message.author.id); // Menghapus reaksi pengguna
      } catch (error) {
        console.error('Error:', error);
      }
    });

    collector.on('end', () => {
      channelsEmbed.reactions.removeAll().catch((error) => console.error('Error:', error)); // Menghapus semua reaksi
    });
  },
};

// Fungsi untuk membagi array menjadi kelompok berukuran tertentu
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
