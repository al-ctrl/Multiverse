const client = require('../index.js')
const db = require("quick.db")

client.on('messageCreate', async (message) => {
if (message.author.bot) return // pengecualian pesan dari bot

  if (message.partial) await message.fetch();

  const emoji = await db.get(`autoReactEmoji-${message.guild.id}`);
  const channelID = await db.get(`autoReactChannel-${message.guild.id}`);
  const roleID = await db.get(`autoReactRole-${message.guild.id}`);

  if (emoji && channelID && roleID && message.channel.id === channelID) {
    const role = message.guild.roles.cache.get(roleID);
    if (role) {
      await message.react(emoji);
      message.awaitReactions({
        filter: (reaction, user) => reaction.emoji.name === emoji && !user.bot,
        max: 1,
        time: 60000,
        errors: ['time']
      })
      .then(reactions => {
        const reactedUser = reactions.first().users.cache.last();
        const member = message.guild.members.cache.get(reactedUser.id);
        if (member) {
          member.roles.add(role)
            .catch(console.error);
        }
      })
      .catch(console.error);
    } else {
      console.error(`Auto react role not found: ${roleID}`);
    }
  }
});