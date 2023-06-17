const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "serverroles",
  aliases: ['roles', 'allroles'],
  category: "info",
  description: "Menampilkan Daftar Semua Role di Server",
  usage: "",
  accessableby: "everyone",
  run: async (client, message, args) => {
    const roles = message.guild.roles.cache;

    if (roles.size === 0) {
      return message.reply("**Tidak ada Role yang ditemukan di server ini!**");
    }

    const sortedRoles = roles.sort((a, b) => b.position - a.position); // Menyortir peran berdasarkan posisi

    const roleChunks = chunkArray([...sortedRoles.values()], 10); // Membagi peran menjadi kelompok berukuran 10

    const embedArray = roleChunks.map((chunk, index) => {
      const roleNames = chunk.map((role) => `**${role.name}** (${role.members.size} anggota)`).join("\n");
      const embed = new MessageEmbed()
        .setTitle(`Daftar Semua Role di Server ${message.guild.name} (Halaman ${index + 1}/${roleChunks.length})`)
        .setDescription(roleNames)
        .setFooter(`Total: ${roles.size} Role`)
        .setTimestamp();
      return embed;
    });

    let currentPage = 0;
    const rolesEmbed = await message.reply({ embeds: [embedArray[currentPage]] });

    // Menambahkan reaksi untuk navigasi halaman
    await rolesEmbed.react('⬅️');
    await rolesEmbed.react('➡️');

    const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = rolesEmbed.createReactionCollector({ filter, time: 60000 });

    collector.on('collect', async (reaction) => {
      try {
        if (reaction.emoji.name === '⬅️') {
          if (currentPage > 0) {
            currentPage--;
            await rolesEmbed.edit({ embeds: [embedArray[currentPage]] });
          }
        } else if (reaction.emoji.name === '➡️') {
          if (currentPage < embedArray.length - 1) {
            currentPage++;
            await rolesEmbed.edit({ embeds: [embedArray[currentPage]] });
          }
        }
        await reaction.users.remove(message.author.id); // Menghapus reaksi pengguna
      } catch (error) {
        console.error('Error:', error);
      }
    });

    collector.on('end', () => {
      rolesEmbed.reactions.removeAll().catch((error) => console.error('Error:', error)); // Menghapus semua reaksi
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
