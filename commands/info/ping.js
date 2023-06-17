const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Menampilkan Ping',
    run : async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Mengitung...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`⚡ Ping = ${client.ws.ping}ms!\n💓 Latensi = ${Math.floor(msg.createdAt - message.createdAt)}ms!`)
            await message.reply({ embeds: [embed] })
            msg.delete()
    }
}