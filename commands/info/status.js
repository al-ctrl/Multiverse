const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "status",
    category: "info",
    noalias: [""],
    description: "Menampilkan status pengguna",
    usage: " ",
    accessibleby: "everyone",
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        if (!user.presence || !user.presence.activities || !user.presence.activities.length) {
            const sembed = new MessageEmbed()
                .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                .setColor("GREEN")
                .setThumbnail(user.user.displayAvatarURL())
                .addField("**Tidak Ada Status**", 'Pengguna ini tidak memiliki status kustom!')
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp();
            message.channel.send({embeds : [sembed]});
            return;
        }

        user.presence.activities.forEach((activity) => {
            if (activity.type === 'CUSTOM_STATUS') {
                const embed = new MessageEmbed()
                    .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                    .setColor("GREEN")
                    .addField("**Status**", `**Status Kustom** -\n${activity.emoji || "Tidak Ada Emoji"} | ${activity.state}`)
                    .setThumbnail(user.user.displayAvatarURL())
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp();
                message.channel.send({embeds : [embed]});
            } else if (activity.type === 'PLAYING') {
                let name1 = activity.name;
                let details1 = activity.details;
                let state1 = activity.state;
                let image = user.user.displayAvatarURL({ dynamic: true });

                const sembed = new MessageEmbed()
                    .setAuthor(`Aktivitas ${user.user.username}`)
                    .setColor(0xFFFF00)
                    .setThumbnail(image)
                    .addField("**Tipe**", "Bermain")
                    .addField("**Aplikasi**", `${name1}`)
                    .addField("**Rincian**", `${details1 || "Tidak Ada Rincian"}`)
                    .addField("**Sedang Mengerjakan**", `${state1 || "Tidak Ada Rincian"}`);
                message.channel.send({embeds : [sembed]});
            } else if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {
                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

                let trackName = activity.details;
                let trackAuthor = activity.state;
                let trackAlbum = activity.assets.largeText;

                trackAuthor = trackAuthor.replace(/;/g, ",");

                const embed = new MessageEmbed()
                    .setAuthor('Info Track Spotify', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                    .setColor("GREEN")
                    .setThumbnail(trackIMG)
                    .addField('Nama Lagu', trackName, true)
                    .addField('Album', trackAlbum, true)
                    .addField('Penyanyi', trackAuthor, false)
                    .addField('Dengarkan Track', `${trackURL}`, false)
                    .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }));
                message.channel.send({embeds : [embed]});
            }
        });
    }
};
