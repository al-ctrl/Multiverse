const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  name: "roleserver",
  aliases: [],
  category: "administrator",
  description: "Menampilkan Daftar Semua Peran di Server",
  usage: "",
  accessableby: "everyone",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      return message.reply("Kamu tidak memiliki permission **ADMINISTRATOR** untuk menggunakan command ini!");
    }

    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position);

    if (roles.size === 0) {
      return message.reply("**Tidak ada peran yang ditemukan di server ini!**");
    }

    const roleList = roles.map((role) => role.name).join("\n");

    const rolesEmbed = new MessageEmbed()
      .setTitle(`Daftar Semua Peran di Server ${message.guild.name}`)
      .setDescription(roleList)
      .setFooter(`Total: ${roles.size} peran`)
      .setTimestamp();

    message.channel.send({ embeds: [rolesEmbed] });
  },
};
