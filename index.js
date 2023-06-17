const { Collection, Client, Discord } = require('discord.js')
const config = require('./config.json');
const fs = require('fs');
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",],
});
const ultrax = require('ultrax');
const instagram = require('user-instagram');
const { keep_alive } = require('./keep_alive.js');
const date = require('date-and-time');

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command", "event"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

ultrax.boost.start(client, '') //role id booster

client.on('boost', async booster => {
  const boostImage = ultrax.boostImage
  let avatar = booster.user.displayAvatarURL({ dynamic: false })
  let boostCard = await boostImage(avatar)
  const boostchannel = client.channels.cache.get('') //channel send boster image
  boostchannel.send({ content: `Terima kasih ${booster}, murah rejeki dan sehat selalu yaa <3`, files: [boostCard] })
})


client.login(config.token)