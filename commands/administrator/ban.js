const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "ban",
    aliases: ["b", "banish"],
    category: "administrator",
    description: "Ban User/pengguna",
    usage: "[name | nickname | mention | ID] <reason/alasan> (optional)",
    accessableby: "Administratot",

    run: async(client, message, args) => {
        try {
            if (!message.member.permissions.has("BAN_MEMBERS"))
            return message.reply("**Anda tidak memiliki izin untuk Banish pengguna - [BAN_MEMBERS]**");
        
            if (!message.guild.me.permissions.has("BAN_MEMBERS"))
            return message.reply("**Saya tidak memiliki izin untuk Banish pengguna - [BAN_MEMBRES]**");

            if (!args[0]) return message.channel.send("**Harap berikan nama [nama | nickname | mention | ID] pengguna untuk di BAN!**");

            let banMember = message.mentions.member.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocalLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase === args[0].toLocalLowerCase());
            if (banMember === message.member)
            return message.channel.send("**Anda tidak dapat melakukan BAN kepada diri sendiri - loving ur self mabroo!**");

            var reason = args.slice(1).join(" ");

            if (!banMember.banable)
            return message.channel.send("**Tidak bisa menendang pengguna itu**");
        try {
            await banMember.send(`**Halo, Anda telah Diblokir/di BAN Dari ${message.guild.name} Dengan Alasan - ${reason || "Tidak ada alasan"}**`);

            await message.guild.members.ban(banmember, { days: 7, reason: reason });
        } catch {
            message.guild.members.ban(banMember, {days: 7, reason: reason});
        }

        if (reason) {
            var sembed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**${banMember.user.username}** telah di BAN dengan alasan ${reason}`);

            message.channel.send({ embeds: [sembed] });
        } else {
            var sembed2 = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**${banMember.user.username}** Telah Di BAN!`);

            message.channel.send({embeds: [sembed2]});
        }

        let channel = db.get(`modlog_${message.guild.id}`);
        if (!channel) return;

        const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
        .setThumbnail(banMember.user.displayAvatarURL({dynamic: true}))
        .addFields("**MOODERATOR**", "ban")
        .addFields("**Banned**", banMember.user.username)
        .addFields("**ID**", `${banMember}`)
        .addFields("**Banned Oleh**", message.author.username)
        .addFields("**Alasan**", `${reason || "**Tidak ada alasan**"}`)
        .addFields("**Date**", message.createdAt.toLocalString())
        .setTimestamp();

        var channel = message.guild.channels.cache.get(channel);

        if (!sChannel) return;
        sChannel.send({embeds: [embed]})
        } catch {
            return message.channel.send(`${e.message}`)
        };
    }
};