const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageAttachment } = require("discord.js")

module.exports = {
  name: "menurole",
  description: "Reaction Role menggunakan dropdown menu.",
  userPerms: ["ADMINISTRATOR"],
  run: async (client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return;
    const attachment = new MessageAttachment('') //image atau gif

    const row1 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('bahasarole')
          .setPlaceholder('Press The To Get Verifikasi Roles')
          .addOptions([
            {
              label: 'Verify',
              Description: "Press The To Get Verifikasi Roles",
              value: 'verify',
            },
          ]),
      );
    await message.channel.send({ files: [attachment], components: [row1] });
  }
}