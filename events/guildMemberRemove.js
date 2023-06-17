const client = require("../index.js");
const server = require("../config.json");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');


client.on('guildMemberRemove', async(member) => {
  const guild = client.guilds.cache.get('');

  const embed = new MessageEmbed()
      .setTitle(member.user.tag)
      .setImage('https://cdn.discordapp.com/attachments/1111617079850831892/1111672789930348705/00f07983d534ad5c4e60fdf66e58255f.jpg')
      .setDescription(`
    **why did you leave the server Σ(T□T) !?!!**
    menk will miss you! o(╥﹏╥)o
    
────────────────────
`)
    .setThumbnail(member.displayAvatarURL())
.setFooter(`Member sekarang : ${guild.memberCount}!`)
.setTimestamp();

await member.guild.channels.cache.get('').send({
  content: `Selamat Tinggal ${member}`,
  embeds: [embed],
})
})