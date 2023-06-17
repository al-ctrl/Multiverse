const client = require("../index.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

client.on('guildMemberAdd', async (member) => {
  const guild = client.guilds.cache.get('');
  const channelId7 = '';
  const channelId6 = '';
  const channelId5 = '';

  const row1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setURL(`https://discord.com/channels/${member.guild.id}/${channelId5}`)
        .setLabel("｡` Verify `｡")
        .setStyle('LINK'),

      new MessageButton()
        .setURL(`https://discord.com/channels/${member.guild.id}/${channelId6}`)
        .setLabel("｡` Roles `｡")
        .setStyle('LINK'),

      new MessageButton()
        .setURL(`https://discord.com/channels/${member.guild.id}/${channelId7}`)
        .setLabel("｡` About Server`｡")
        .setStyle('LINK')
    );

  const embed = new MessageEmbed()
    .setTitle(member.user.tag)
    .setImage('https://cdn.discordapp.com/attachments/1111617079850831892/1111672789615779920/a6f3e84af795c6049812bbec82e6a790.jpg')
    .setDescription(`
      **[](https://discord.gg/)**
      **heiyoo**
    
      **Hello My love ♡, welcome to ${guild.message.name}.**
      thank youu for joining our server!
      enjoy ur stay my love!<3


      **Enjoy and have fun**
      ────────────────────
    `)
    .setThumbnail(member.displayAvatarURL())
    .setFooter(`Member sekarang : ${guild.memberCount}!`)
    .setTimestamp();

  await member.guild.channels.cache.get('').send({
    content: `Selamat Datang ${member}`,
    embeds: [embed],
    components: [row1]
  });
});

