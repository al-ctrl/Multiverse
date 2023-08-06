const { MessageEmbed, Message } = require('discord.js');

module.exports = {
  name: "embed",
  category: "moderation",
  description: "Membuat kata kata dengan embed",

  run: async (client, message, args) => {
    try {
      if (!args.length && message.attachments.size === 0)
      return message.reply("Mohon Masukan Kata-kata atau Unggah Gambar yang akan di Embed!");
    message.delete({ timeout: 1000 });

    const embed = new MessageEmbed();
    if (args.length > 0)
    embed.setDescription(args.join(" "));

    if (message.attachments.size > 0) {
      const attachments = message.attachments.first();

      if (attachments && attachments.url) {
        embed.setImage(attachments.url);
      }
    }
    message.channel.send({ embeds: [embed] });
    } catch (e) {
      throw e;
    }
  }
};