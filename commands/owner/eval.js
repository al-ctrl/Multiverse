const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "eval",
    description: "Evaluasi code discord.js",
    accessableby: "Bot Owner",
    category: "owner",
    aliases: ["e"],
    usage: 'eval <input>',

    run: async (client, message, args) => {
        function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        let owner = ['500965309084073994'] //ID owner atau developers by ALDYAN


        if (!owner.includes(message.author.id)) return;

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            message.react("✅");
            var emb = new MessageEmbed()
                .setTitle('Hasil')
                .setDescription(`\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(0xd26a0e)
            message.channel.send({ embeds: [emb] });
        } catch (err) {
            message.react("⚠");
            var emb = new MessageEmbed()
                .setTitle('Hasil')
                .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(0xd26a0e)
            message.channel.send({ embeds: [emb] });
        }
    }
}