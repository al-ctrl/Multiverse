const { Permissions, MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "autoquote",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.channel.send(`Kamu membutuhkan **Manage Channels** permission untuk menggunakan perintah ini!`);

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!channel) return message.channel.send(`Channel tidak valid!`);

    const description = args.slice(1).join(" "); // Mengambil deskripsi dari argumen setelah channel

    const embed = new MessageEmbed()
      .setDescription(description)
      .setFooter(`Quotes dari: ${message.author.tag} • ${message.createdAt.toLocaleString()}`)
      .setColor('RANDOM');

    await db.set(`autoEmbedChannel-${message.guild.id}`, { channel: channel.id, description: description });

    message.reply(`Auto embed telah berhasil diatur untuk channel ${channel} dengan deskripsi: ${description}`);
  }
}