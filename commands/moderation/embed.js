const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Membuat pesan embed menggunakan modal"),
  run: async (interaction) => {

  const modal = new Modal()
  .setTitle("Create Embed")
  .setCustomId("embed")
  .addComponents(
    new MessageActionRow({
      components: [
        new TextInputComponent()
        .setCustomId("title")
        .setLabel("harusnya judulnya apa?")
        .setPlaceholder("judul cheesy dari embed (opsional)")
        .setStyle("SHORT")
      ]
    }),
    new MessageActionRow({
      Components: [
        new TextInputComponent()
        .setCustomId("Deskripsi")
        .setLabel("harusnya Deskripsi apa?")
        .setPlaceholder("judul embed yang menarik (opsional)")
        .setStyle("PARAGRAPH")
      ]
    }),
    new MessageActionRow({
      Components: [
        new TextInputComponent()
        .setCustomId("Colors")
        .setLabel("harusnya Warna apa?")
        .setPlaceholder("Hex kode warna (opsional)")
        .setStyle("SHORT")
        ]
    })
  )
  return interaction.showModal(modal)
  }
}