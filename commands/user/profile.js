const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name : "okinawa",
  description: "Menampilkan Akun Sosmed Megumi dan lain lain.",
  run : async(client, message, args) => {
    
    const row1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel("｡` Discord `｡")
      .setStyle("LINK")
      .setURL(`https://discord.gg/`)
      .setEmoji(``)
      )

      
    .addComponents(
      new MessageButton()
      .setLabel("｡` Instagram `｡")
      .setStyle("LINK")
      .setURL(`https://instagram.com/`)
      .setEmoji(``)
      )

      
    .addComponents(
      new MessageButton()
      .setLabel("｡` Tiktok `｡")
      .setStyle("LINK")
      .setURL(`https://www.tiktok.com/`)
      .setEmoji(``)
      );
    
      
    let embed = new MessageEmbed()
    .setThumbnail(``)
      .setImage(``)
    .setTitle("Infomasi Sosmed")
    .addField(`<:2071hearteyes:1061683477965185065> Instagram `, "#..Vibes")
    .addField(`<:516395crythumbsup:1061681784150048828> Discord `, ".. Enthusiasts Community")
    .addField(`<:7398happystimming:1061683461867446282> Tiktok`, "#..Unfiltered")

      message.channel.send({
        embeds: [embed],
        components: [row1]
      })
      message.delete ({ timeout: 1000 });
  }
}