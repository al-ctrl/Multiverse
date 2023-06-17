const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: "userinfo",
  aliases: ['ui', 'whois'],
  category: "umum",
  description: "Menampilkan informasi pengguna",
  usage: "[username | nickname | mention | ID](optional)",
  run: async(client, message, args, commandName, Discord) => {
    
    const Target = message.mentions.users.first() || message.author;
    const Member = message.guild.members.cache.get(Target.id);

    const response = new MessageEmbed()
    .setTitle("User Info / Info Pengguna")
    .setAuthor(`${Target.username}`, Target.displayAvatarURL({dynamic: true}))
    .setThumbnail(Target.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM")
    .addField("**Informasi Pengguna**", `${Member.displayName}`)
    .addField("**ID**", `${Target.id}`, false)
    .addField("**Username**",`${Member.user.username}`)
    .addField("**Tag**", `${Member.user.tag}`)
    .addField("**Anggota Server Sejak**", `${moment(Member.user.joinedAt).format('MMM/D/YYYY')}`)
    .addField("**Pengguna Discord Sejak**", `${moment(Member.user.createdAt).format('MMM/D/YYYY')}`)
    .addField("**Role**", `${Member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
    .setTimestamp()

    message.reply({ embeds: [response] })
  }
}