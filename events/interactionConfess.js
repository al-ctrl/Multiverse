// Import Discord.js
const { Interaction } = require('discord.js');

// Event handler for interactionCreate event
module.exports = {
  name: 'interactionConfess',
  once: false,
  execute(interaction) {
    if (!interaction.isButton()) return;

    // Check if the interaction is related to the 'confession' command
    if (interaction.customId === 'confess_anonymous' || interaction.customId === 'confess_named') {
      handleConfessionInteraction(interaction);
    }
  },
};

async function handleConfessionInteraction(interaction) {
  // Check if the interaction is in a guild
  if (!interaction.guild) {
    return interaction.reply('This interaction is only available in a guild.');
  }

  // Get the member who interacted with the button
  const member = interaction.member;

  // Handle the interaction based on the customId of the button
  switch (interaction.customId) {
    case 'confess_anonymous':
      await interaction.reply({
        content: 'You chose to confess anonymously.',
        ephemeral: true, // Only visible to the user who interacted
      });
      // Do something for anonymous confession
      break;
    case 'confess_named':
      await interaction.reply({
        content: 'You chose to confess with a name.',
        ephemeral: true, // Only visible to the user who interacted
      });
      // Do something for named confession
      break;
    default:
      // Handle unrecognized customId
      await interaction.reply('This button interaction is not recognized.');
      break;
  }
}
