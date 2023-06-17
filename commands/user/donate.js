const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name : "donate",
  description: "Menampilkan Akun Sosmed Megumi dan lain lain.",
  run : async(client, message, args) => {
    
    const row1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel("｡` Trakteer `｡")
      .setStyle("LINK")
      .setURL(`https://trakteer.id/../link`)
      )

      
    .addComponents(
      new MessageButton()
      .setLabel("｡` Saweria `｡")
      .setStyle("LINK")
      .setURL(`https://saweria.co/`)
      )
    
      
    let embed = new MessageEmbed()
    .setThumbnail(`https://media.discordapp.net/attachments/1055510799390621826/1091727188312739930/IMG_9608.png?width=395&height=700`)
      .setImage(`https://saweria.co/twitter_card.png`)
    .setTitle(` <:4886kittylove:1061679537445945414> Infomasi Donate`)
    .addField("Okinawaa!", "Nabung with Lylynn!<3, thank you for ur donations!")

      message.channel.send({
        embeds: [embed],
        components: [row1]
      })
      message.delete ({ timeout: 1000 });
  }
}