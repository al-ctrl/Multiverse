const { Permissions, MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "autoreact",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send(`Kamu membutuhkan **Manage Roles** permission untuk menggunakan perintah ini!`);

    const emoji = args[0];
    if (!emoji) return message.channel.send(`Emoji tidak valid!`);

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    if (!channel) return message.channel.send(`Channel tidak valid!`);

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if (!role) return message.channel.send(`Role tidak ditemukan!`);

    await db.set(`autoReactEmoji-${message.guild.id}`, emoji);
    await db.set(`autoReactChannel-${message.guild.id}`, channel.id);
    await db.set(`autoReactRole-${message.guild.id}`, role.id);

    message.reply(`Auto react telah berhasil diatur untuk channel ${channel}!`);
  }
}