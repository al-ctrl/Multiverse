const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: "boobs",
  aliases: [],
  category: "nsfw",
  description: "Menampilkan gambar acak 'boobs'",
  usage: "",
  accessableby: "everyone",

  run: async (client, message, args) => {
    if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send({
        embeds: [{
          color: 16734039,
          description: "Anda dapat menggunakan perintah ini di Saluran NSFW!"
        }]
      });
    }

    try {
      const response = await superagent.get('https://nekobot.xyz/api/image?type=boobs');
      const data = response.body;
      const embed = new MessageEmbed()
        .setTitle(":smirk: Boobs")
        .setImage(data.message)
        .setColor('RANDOM')
        .setFooter('Tags: boobs')
        .setURL(data.message);
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.channel.send('Terjadi kesalahan saat mengambil gambar.');
    }
  }
};
