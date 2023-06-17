const client = require("../index.js")
const wait = require('util').promisify(setTimeout);

client.on('interactionCreate', async interaction => {
  const member = await interaction.message.guild.members.fetch({
    user: interaction.user.id,
    force: true
  })
  if (!interaction.isSelectMenu()) return;

  //verify
  if (interaction.values == 'verify') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  // UMUM ROLE +++++++++++++++++++++++++++++++++++++++++++++++++

  //Bahasa Role
  if (interaction.values == 'lanang') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }


  //Age Role
  if (interaction.values == '18 +') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == '- 18') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  //Regional Role
  if (interaction.values == 'sumatra') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }
  if (interaction.values == 'sulawesi') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }
  if (interaction.values == 'kalimantan') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }
  if (interaction.values == 'jawa') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }
  if (interaction.values == 'pulaulain') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  //Kesibukan Role
  if (interaction.values == 'work') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }
  if (interaction.values == 'ngampus') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }
  if (interaction.values == 'nolep') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }


  //GAME ++++++++++++++++++++++++++++++++++++++++++++++++++++++

  if (interaction.values == 'ml') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == 'pubg') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == 'valo') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }


  if (interaction.values == 'genshin') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == 'apexm') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == 'pb') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == 'dota') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == 'ff') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == 'gta') {
    await interaction.deferUpdate();
    if (!member.roles.cache.has("")) {
      await member.roles.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }

  if (interaction.values == 'apexpc') {
    await interaction.deferUpdate();
    if (!member.role.cache.has("")) {
      await member.role.add('')
    } else if (member.roles.cache.has("")) {
      await member.roles.remove('')
    }
  }



})