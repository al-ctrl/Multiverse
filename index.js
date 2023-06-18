const { Collection, Client, Discord, MessageAttachment, MessageEmbed } = require('discord.js')
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
const { IgApiClient } = require('instagram-web-api');
const { Database } = require('@replit/database');
const picExt = ['.webp', '.png', '.jpg', '.jpeg', '.gif'];
const videoExt = ['.webm', '.mp4', '.mov'];



module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command", "event"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

ultrax.boost.start(client, '1055523295321133116')

client.on('boost', async booster => {

  const embed = new MessageEmbed()
    .setTitle(booster.user.tag)
    .setImage('https://media.discordapp.net/attachments/1055692690613870734/1055711212891013170/b49bdfa828cc3364.jpg?width=847&height=282')
    .setDescription(`
      𝐎𝐤𝐢𝐢𝐧𝐚𝐰𝐚'𝐬 𝐂𝐚𝐛𝐢𝐧 𝐇𝐚𝐬 𝐁𝐞𝐞𝐧 𝐛𝐨𝐨𝐬𝐭𝐞𝐝\n\n Thank you ${booster}, murah rejeki dan sehat selalu yaa <3\n
────────────────────
`)
    .setThumbnail(booster.user.displayAvatarURL())

  await booster.guild.channels.cache.get('1055508385170194552').send({
    content: `Haiii Terima kasih ${booster}`,
    embeds: [embed]
  })


});





client.login(config.token)