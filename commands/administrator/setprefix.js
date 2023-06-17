const { discord, Permissions } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'setprefix',
    run: async (client, message, args, prefix) => {
        if (!message.content.startsWith(prefix)) return;

        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply(`Kamu tidak mempunyai permission **ADMINISTRATOR** untuk menggunakan command!`)
        const newprefix = args[0]
        if (!newprefix) return message.reply('Masukan Prefix Baru')
        if (newprefix.length > 5) return message.channel.send("Prefix tidak bisa, Prefix terlalu panjang")
        message.channel.send(`**Memperbarui Prefix Baru = \`${newprefix}\`**`)
        db.set(`prefix_${message.guild.id}`, newprefix);
    }
}