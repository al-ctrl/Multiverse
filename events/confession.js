const { Client, Collection, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});


const config = require("../config.json");
const ServerID = config.GuildID;
const channelID = config.CfsID;
const LogChannel = config.CfsLogID;
const Database = require("@replit/database")
const db = new Database()
const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".webm", ".mp4", ".mov"];

async function createEmbed(text, message) {
    const newembed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setDescription(text);
    return message.channel.send({ embeds: [newembed] });
}


client.on('messageCreate', async (message) => {
    // cfs
    if (message.author.bot) return;
    let check = await db.get("CfsCount");
    if (check == null) db.set("CfsCount", 0);
    let checklogs = await db.get("logs");
    if (checklogs == null) db.set("logs", []);

    if (message.channel.type === "DM") {
        let CfsCount = await db.get("CfsCount");
        let logs = await db.get("logs");
        let userID = message.author.id;

        if (message.content.toLowerCase().startsWith(config.PREFIX.toLowerCase() + "anon")) {
            const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
            const content = args.slice(1).join(" ");

            if (!content) return createEmbed("**❌ | Silakan masukkan Pesan Rahasia**", message);

            createEmbed("**💌 | Pesan Rahasiamu telah terkirim!**", message).then(msg => msg.delete({ timeout: 10000 }));

            CfsCount += 1;
            await db.set("CfsCount", CfsCount);
            logs.push(message.author.id);
            await db.set("logs", logs);

            if (content.length > 1024) return message.reply("Your message content too many characters (1024 Limit) :/");

            let embed = new Discord.MessageEmbed()
                .setTitle(`📧   Anonymous`)
                .setDescription(content)
                .setFooter(`Developer by Aldyann`)
                .setTimestamp();

            let embed1 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Pesan rahasia Log #${CfsCount}`, client.user.displayAvatarURL())
                .setDescription(content)
                .setFooter("pesan rahasia Dikirim oleh:  " + message.author.tag + " ", message.author.avatarURL)
                .setTimestamp();

            if (message.attachments.size > 0) {
                const attachment = message.attachments.first();

                picExt.forEach(ext => {
                    if (attachment.name.endsWith(ext)) {
                        embed.setImage(attachment.url);
                        embed1.setImage(attachment.url);
                        client.guilds.cache.get(ServerID)?.channels.cache.get(channelID)?.send({ embeds: [embed] })
                            .catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`));

                        const channelIDS = LogChannel;
                        if (channelIDS == "no-channel") return;
                        client.guilds.cache.get(ServerID)?.channels.cache.get(channelIDS)?.send({ embeds: [embed1] });
                    }
                });

                videoExt.forEach(ext => {
                    if (attachment.name.endsWith(ext)) {
                        client.guilds.cache.get(ServerID)?.channels.cache.get(channelID)?.send(`**Pesan Rahasia baru #${CfsCount}**`, { files: [attachment.url] })
                            .catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`));

                        const channelIDS = LogChannel;
                        if (channelIDS == "no-channel") return;
                        client.guilds.cache.get(ServerID)?.channels.cache.get(channelIDS)?.send(`**Pesan Rahasia baru #${CfsCount}\nPesan Rahasia dikirim oleh: ${message.author.tag}**`, { files: [attachment.url] })
                            .catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`));
                    }
                });
            } else {
                client.guilds.cache.get(ServerID)?.channels.cache.get(channelID)?.send({ embeds: [embed] })
                    .catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`));

                const channelIDS = LogChannel;
                if (channelIDS === "no-channel") return;
                client.guilds.cache.get(ServerID)?.channels.cache.get(channelIDS)?.send({ embeds: [embed1] });
            }
        } else if (message.content.toLowerCase().startsWith(config.PREFIX.toLowerCase() + "pub")) {
            const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
            const content = args.slice(1).join(" ");

            if (!content) return createEmbed("**❌ | Silakan masukkan Pesan anda!**", message);

            createEmbed("**💌 | Pesanmu telah terkirim!**", message).then(msg => msg.delete({ timeout: 10000 }));

            CfsCount += 1;
            await db.set("CfsCount", CfsCount);
            logs.push(message.author.id);
            await db.set("logs", logs);

            if (content.length > 1024) return message.reply("Your message content too many characters (1024 Limit) :/");

            let embed = new Discord.MessageEmbed()
                .setTitle(`📧   ${message.author.tag}`)
                .setDescription(content)
                .setFooter(`Developer by Aldyann`)
                .setTimestamp();

            let embed1 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Pesan Normal Log #${CfsCount}`, client.user.displayAvatarURL())
                .setDescription(content)
                .setFooter("Pesan Normal, Dikirim oleh:  " + message.author.tag + " ", message.author.avatarURL)
                .setTimestamp();

            if (message.attachments.size > 0) {
                const attachment = message.attachments.first();

                picExt.forEach(ext => {
                    if (attachment.name.endsWith(ext)) {
                        embed.setImage(attachment.url);
                        embed1.setImage(attachment.url);
                        client.guilds.cache.get(ServerID)?.channels.cache.get(channelID)?.send({ embeds: [embed] })
                            .catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`));

                        const channelIDS = LogChannel;
                        if (channelIDS == "no-channel") return;
                        client.guilds.cache.get(ServerID)?.channels.cache.get(channelIDS)?.send({ embeds: [embed1] });
                    }
                });

                videoExt.forEach(ext => {
                    if (attachment.name.endsWith(ext)) {
                        client.guilds.cache.get(ServerID)?.channels.cache.get(channelID)?.send(`**Pesan Normal baru #${CfsCount}**`, { files: [attachment.url] })
                            .catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`));

                        const channelIDS = LogChannel;
                        if (channelIDS == "no-channel") return;
                        client.guilds.cache.get(ServerID)?.channels.cache.get(channelIDS)?.send(`**Pesan Normal baru #${CfsCount}\nPesan Normal dikirim oleh: ${message.author.tag}**`, { files: [attachment.url] })
                            .catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`));
                    }
                });
            } else {
                client.guilds.cache.get(ServerID)?.channels.cache.get(channelID)?.send({ embeds: [embed] })
                    .catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`));

                const channelIDS = LogChannel;
                if (channelIDS === "no-channel") return;
                client.guilds.cache.get(ServerID)?.channels.cache.get(channelIDS)?.send({ embeds: [embed1] });
            }

        } else if (message.content.toLowerCase().startsWith(config.PREFIX.toLowerCase() + "reply")) {
            const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
            const Rargs = args.slice(2).join(" ");

            if (!args[1]) return createEmbed("**❌ | Silakan masukkan jumlah Pesan Rahasia**", message);
            if (isNaN(args[1])) return createEmbed("**❌ | Harap masukkan bilangan bulat!**", message);
            if (!Rargs) return createEmbed("**❌ | Silakan masukkan pesan Anda**", message);

            const targetIndex = parseInt(args[1]) - 1;
            const targetUserID = logs[targetIndex];

            try {
                if (message.author.bot) return;

                const user = await client.users.fetch(targetUserID);
                if (!user) return createEmbed("**Tidak dapat mengirim pesan ke pengguna ini**", message);

                const embed = new Discord.MessageEmbed()
                    .setColor('#FFE9A7')
                    .setAuthor(`Seseorang menjawab Pesanmu`, client.user.avatarURL({ dynamic: true }))
                    .setDescription(Rargs)
                    .setTimestamp();

                user.send({ embeds: [embed] });
                console.log(`Balasan dikirim ke ${targetUserID}!`);

                createEmbed("**Pesan Anda Terkirim!**", message).then(msg => msg.delete({ timeout: 10000 }));

            } catch (error) {
                return createEmbed("**Tidak dapat mengirim pesan ke pengguna ini**", message);
            }
        }
    }
});

