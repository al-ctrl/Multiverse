const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "poll",
        description: "polling",
        category: "info",
        usage: "[question]",
        noalias: "No Aliases",
        accessableby: "Administrator",
    run: async (bot, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send("**You Do Not Have Sufficient Permissions! - [MANAGE_GUILD]**");

        if (!args[0])
            return message.channel.send("**Silakan Masukkan Pertanyaan!**");

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Pertanyaan untuk Kalian`)
            .setDescription(args.join(' '))
            .setFooter(`Poll by ${message.author.tag}`)
        var msg = await message.channel.send({ embeds: [embed] });

        await msg.react('✅');
        await msg.react('❌');

        message.delete({ timeout: 1000 });
    }
}
