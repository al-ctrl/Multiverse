const { Permissions, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: "autorole",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send(`kamu membutuhkan **Manage Role** permission untuk menggunakan command ini!`)

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) return message.channel.send(`Role tidak ditemukan!!`)

    await db.set(`autorole-${message.guild.id}`, role.id);
    message.reply(`Role ***${role.name}*** Sudah dipasang!!`)
  }
}