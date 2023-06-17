  
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
        name: "kick",
        category: "moderation",
        description: "Menendang Member",
        accessableby: "Administrator",
        usage: "[nama | nickname | mention | ID] <reason> (optional)",
        aliases: ["k"],
        run: async (client, message, args, prefix) => {
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("**Kamu tidak punya Permission untuk Menendang Member! - [KICK_MEMBERS]**");
            if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("**Saya tidak punya Permission untuk Menendang Member! - [KICK_MEMBERS]**");

            if (!args[0]) return message.channel.send('**Masukan nama pengguna yang mau ditendang!!**')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**Pengguna tidak ada di dalam SERVER!**");

            if (kickMember.id === message.member.id) return message.channel.send("**Kamu tidak bisa menendang dirimu sendiri my friend!**")

            if (!kickMember.kickable) return message.channel.send("**Tidak bisa menendang pengguna ini!**")
            if (kickMember.user.bot) return message.channel.send("**Tidak bisa menendang BOT!**")

            var reason = args.slice(1).join(" ");
            try {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**Halo, Kamu telah di kick/ditendang dari SERVER ${message.guild.name} Karena - ${reason || "Tidak ada alasan!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send({ embeds: [embed] }).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${kickMember.user.username}** Telah ditendang karena ${reason}`)
            message.channel.send({ embeds: [embed2] });
            } else {
                const embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${kickMember.user.username}** Telah ditendang karena tidak ada alasan!`)
            message.channel.send({ embeds: [embed3] });
            }
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}