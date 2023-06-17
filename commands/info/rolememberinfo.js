const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "rolememberinfo",
        aliases: ['rolemembers', 'rmi', 'inrole'],
        category: "info",
        description: "Menampilkan Daftar Anggota yang Memiliki Role",
        usage: "[role name | role mention | ID]",
        accessableby: "everyone",
    run: async (client, message, args) => {
        if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        if (!args[0]) return message.reply("**Tolong masukan nama Role!**")

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.reply("**Silakan Masukkan nama Role yang Valid!**");

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user.tag;
        })
        if (membersWithRole > 2048) return message.reply('**Daftar Terlalu Panjang!**')

        let roleEmbed = new MessageEmbed()
            .setColor()
            .setThumbnail(message.guild.iconURL())
            .setTitle(`Pengguna dengan Role ${role.name}!`)
            .setDescription(membersWithRole.join("\n"));
        message.reply({ embeds: [roleEmbed] });
    }
}