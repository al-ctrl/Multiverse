const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "say",
  category: "moderation",
  description: "Membuat kata kata no embed",
  accessableby: "everyone",
  run: async (client, message, args) => {
    try {
      if (args.length === 0)
        return message.reply("**Masukan Kata Kata!**")
      message.delete({ timeout: 1000 })

      message.channel.send(`${args.join(" ")}`);
    } catch (e) {
      throw e;
    };
  }
};
