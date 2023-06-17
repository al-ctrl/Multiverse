const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Menampilkan info server!",
  usage: " ",
  category: "info",
  accessableby: "everyone",
  aliases: ["sinfo"],
  run: async (client, message, args) => {
    let owner = await message.guild.fetchOwner();
    try {
      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Info Server")
        .setThumbnail(message.guild.iconURL())
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
        .addField("**Nama Guild**", `${message.guild.name}`, true)
        .addField("**Owner Guild**", `${owner.user.tag}`, true)
        .addField("**ID**", `${message.guild.id}`)
        .addField("**Dibuat pada**", `${message.guild.createdAt}`)
        .addField("**Members**", `${message.guild.memberCount}`, true)
        .addField("**Roles**", `${message.guild.roles.cache.size}`, true)
        .addField("**Region**", `${message.guild.region}`, true)
        .addField("**Level Keamanan Verifikasi**", `${message.guild.verificationLevel}`, true)
        .addField("**Bots**", `${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
        .addField("**Emojis**", `${message.guild.emojis.cache.size}`, true)
        .addField("**Boost Level**", `${message.guild.premiumTier}`, true)
        .addField("**Total Boosts**", `${message.guild.premiumSubscriptionCount}`, true);
        
      message.reply({ embeds: [embed] });
    } catch {
      return message.channel.send("Ada yang salah!");
    }
  },
};
