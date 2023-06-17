const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name : "aldyan",
  description: "Menampilkan Informasi pengguna pencipta BOT Starnbitch.",
  run : async(client, message, args) => {
    
    const row1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel("Instagram")
      .setStyle("LINK")
      .setURL(`https://instagram.com/starnbitch`)
      );

      const row2 = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel("Discord Akun")
      .setStyle("LINK")
      .setURL(`https://discord.com/users/500965309084073994/`)
      );
      
    let embed = new MessageEmbed()
    .setThumbnail(`https://images-ext-1.discordapp.net/external/Y94Eg69_fg6fRSWl5OVhkmg2Yq0PRH5fnJxs_xLOkWg/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/500965309084073994/73d6fe098e139e3374b830911e92b942.webp?width=468&height=468`)
    .setTitle("Infomasi Developers")
    .addField("Developer by", "Aldyann")
    .addField("Status", "trying to become translators and frontend web developers :)")

      message.channel.send({
        embeds: [embed],
        components: [row1, row2]
      })
      message.delete ({ timeout: 1000 });
  }
}