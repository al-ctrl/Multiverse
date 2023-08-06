const { Collection, Client, Discord, MessageAttachment, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
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
const { keep_alive } = require('./keep_alive.js');
const date = require('date-and-time');
const { Database } = require('@replit/database');
const picExt = ['.webp', '.png', '.jpg', '.jpeg', '.gif'];
const videoExt = ['.webm', '.mp4', '.mov'];
const { 
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  VoiceConectionStatues 
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { default: ffmpegPath } = require('ffmpeg-static');
const ffmpegPath = require(ffmpegPath-static); 


module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command", "event"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

const VoiceConnections = {};

// menyiapkan event untuk bot dengan membaca Event
let connection; // membuat voice connection pada variable untuk mengecek status

client.once('ready', () => {
  console.log(`${client.user.tag} berhasil memasuki channel`);

  const guildId = 'CHANNEGUILD_ID';
  const voiceChannelId = 'CHANNEL_ID';

  const guild = client.guilds.cache.get(guildId);
  const voiceChannel = client.channels.cache.get(voiceChannelId);

  if (channelChannel) {
    //jika bot sedang berada dalam voice sebelum bot mati/offline, akan melakukan re-join pada voice channel
    if (!connection || connection.state.status === VoiceConnectionStatues.Destroyed) {
      connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
      });

      connection.on(VoiceConectionStatues, ready, async () => {
        console.log(`${client.user.tag} Telah bergabung pada Channel Voice! ${voiceChannel.name}`);
        connection.receiver.deafen = false; //untuk selfdeafen bot mati

        //putar musik menggunakan link youtube
        const youtubeURL = 'LINK_YOUTUBE';
        
        try {
          const stream = ytdl(youtubeURL, {
            filter: 'audioonly',
            opusEncoded: 'true',
            encoderArgs: ['-af', 'bass=10,dynaudnorm=f=200', '-i', ffmpegPath],
          });

          const resource = createAudioResource(stream, {
            inlineVolume: true,
          });

          const audioPlayer = createAudioResource({
            behavior: {
              NoSubscriber:
              NoSubscriberBehavior.Play,
            },
          });

          audioPlayer.play(resource);

          connection.subscribe(audioPlayer);

          //loop musik
          audioPlayer.on('stateChange', (oldState, newState) => {
            if (newState.status === 'idle') {
              audioPlayer.play(resource);
            }
          });

          //re-join setelah disconnect
          connection.on(VoiceConectionStatues.Disconnected, (error) => {
            console.error('Voice Connection Disconnection:', error);
            if (connection && connection.state.status !== VoiceConectionStatues.Destroyed) {
              try {
                connection.rejoin();
              } catch (rejoinError) {
                console.error('error setelah mencoba re-join kembali ke dalam Voice Channel:', rejoinError);
                connection.destroy();
              }
            }
          });
        } catch (error) {
          console.error('Error untuk mencoba memutar music:', error);
          if (connection && connection.state.status !== VoiceConectionStatues.Destroyed) {
            connection.destroy();
          }
        }
      });

      connection.on(VoiceConectionStatues.Disconnected, (error) => {
        console.error('Voice Connection Disconnected:', error);
        if (connection && connection.state.status !== VoiceConectionStatues.Destroyed) {
        try {
          connection.rejoin();
        } catch (rejoinError) {
          console.error('Error saat mencoba Re-join ke Voice Channel:', rejoinError);
          connection.destroy
        }
        }
      });
    }
  }
});

client.VoiceConnections = new Map();

//ultrax.boost.start(client, '') // ID ROLE booster

client.on('boost', async booster => { 

  const embed = new MessageEmbed()
    .setTitle(booster.user.tag)
    .setImage('https://media.discordapp.net/attachments/1055692690613870734/1055711212891013170/b49bdfa828cc3364.jpg?width=847&height=282')
    .setDescription(`
      ${guild}\n\n Thank you ${booster}, murah rejeki dan sehat selalu yaa <3\n
────────────────────
`)
    .setThumbnail(booster.user.displayAvatarURL())

    const adminId1 = '';
    const adminid2 = '';
    const adminId3 = '';
    
    const adminButton1 = new MessageButton()
    .setLabel('')
    .setStyle('LINK')
    .setURL(`https://discord.com/users/${adminId1}`);

    const adminButton2 = new MessageButton()
    .setLabel('')
    .setStyle('LINK')
    .setURL(`https://discord.com/users/${adminId2}`);

    const adminButton3 = new MessageButton()
    .setLabel('')
    .setStyle('LINK')
    .setURL(`https://discord.com/users/${adminId3}`);

    const row = new MessageActionRow()
    .addComponents(adminButton1, adminButton2, adminButton3);


  await booster.guild.channels.cache.get('').send({
    content: `Haiii Terima kasih ${booster}`,
    embeds: [embed],
    components: [row]
  })


});





client.login(config.token)