const { Permissions } = require('discord.js');

module.exports = {
  name: "purge",
  aliases: ["delete", "clear", "prune"],
  category: "moderation",
  description: "Menghapus pesan",
  usage: "delete [jumlah pesan]",
  accessableby: "Administrator",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      return message.reply("Kamu tidak memiliki permission **ADMINISTRATOR** untuk menggunakan command!");
    }

    if (!args[0] || isNaN(args[0])) {
      return message.channel.send("Harap masukkan jumlah pesan yang ingin dihapus!");
    }

    const deleteCount = parseInt(args[0]);

    if (deleteCount > 100) {
      return message.channel.send("Jumlah pesan yang bisa dihapus maksimal adalah 100!");
    }

    if (deleteCount < 1) {
      return message.channel.send("Jumlah pesan yang bisa dihapus minimal adalah 1!");
    }

    try {
      const messages = await message.channel.messages.fetch({ limit: deleteCount + 1 });
      await message.channel.bulkDelete(messages, true);
      message.channel.send(`Berhasil menghapus \`${messages.size - 1}/${deleteCount}\` pesan.`)
        .then((msg) => msg.delete({ timeout: 100000 }));
    } catch (error) {
      console.error(error);
      message.channel.send("Gagal menghapus pesan.");
    }
  },
};
