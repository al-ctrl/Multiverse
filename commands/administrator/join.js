const { MessageEmbed } = require('discord.js');
const { joinVoiceChannel, 
    VoiceConnectionStatus, 
    entersState, 
    createAudioPlayer, 
    AudioPlayerStatus, 
    NoSubscriberBehavior, 
    createAudioResource 
} = require('@discordjs/voice');

const ytdl = require('ytdl-core');
const ffmpegPath = require('ffmpeg-static');
const { Message } = require('discord.js/src/structures/Message');

//membuat peta untuk menyimpan koneksi suara
const VoiceConnections = new Map();

module.exports = {
    name: 'join',
    description: 'Bergabung ke Channel',

    run: async (client, message, args) => {
        // mengecek jika itu pesan dari author pada voice channel
        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) {
            const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setDescription('Anda harus berada dalam voice channel!')
            return message.channel.send({ embeds: [embed] });
        }

        //join pada voice channel
        try {
            const player = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.channel.id,
                adapterCreator: voiceChannel.guildId.voiceAdapterCreator,
            });

            // menunggu siap untuk connect
            await enteresState(player, VoiceConnectionStatus.Ready, 30e3);

            // self deafen bot false, agar bot tidak deafen secara mandiri
            player.receiver.deafen = false;

            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Bergabung ke Voice Channel **${voiceChannel.name}**`);
            message.channel.send({ embeds: [embed] });

            // menyimpan ke dalam koneksi map

            VoiceConnections.set(voiceChannel.guild.id, player);

            // memutar musik dari link youtube
            const audioPlayer = createAudioPlayer({
                behaviors: { noSubscriber: NoSubscriberBehavior.play,},
            });

            const stream = ytdl('LINK_YOUTUBE', {
                filter: 'audioonly',
                opusEncoded: true,
                encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200', '-t', ffmpegPath],
            });

            const resource = createAudioResource(stream, {
                inlineVolume: true,
            });

            audioPlayer.play(resource);
            player.subscribe(audioPlayer);

            //handle disconnection (rejoin saat setelah disconnect dari channel voice)
            player.on(VoiceConnectionStatus.Disconnected, () => {
                console.error('Voice Connection Disconnected.');
                player.rejoin();
            });
        } catch (error) {
            console.error(error);
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('Maaf terjadi kesalahan saat mencoba bargabung pada Voice Channel!');
            message.channel.send({ embeds: [embed] })
        }
    }
};
