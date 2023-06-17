const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageAttachment } = require("discord.js")

module.exports = {
    name: "gamerole",
    description: "Reaction Role menggunakan dropdown menu.",
    userPerms: ["ADMINISTRATOR"],
    run: async (client, message, args, prefix) => {
        if (!message.content.startsWith(prefix)) return;
        const attachment = new MessageAttachment('https://media.discordapp.net/attachments/1001434426904940685/1002211471314391120/Banner_Youtube_Gamer_Tipografi_Neon_2.png?width=885&height=498')

        const row1 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('Mobile Game')
                    .setPlaceholder('Mobile Game')
                    .addOptions([
                        {
                            label: 'Mobile Legend',
                            Description: "Tekan untuk Mengambil/Menghapus Mobile Legend Role",
                            value: 'ml',
                        },
                        {
                            label: 'Pubg',
                            Description: "Tekan untuk Mengambil/Menghapus Pubg Role",
                            value: 'pubg',
                        },
                        {
                            label: 'Free Fire',
                            Description: "Tekan untuk Mengambil/Menghapus Free Fire Role",
                            value: 'ff',
                        },
                        {
                            label: 'Apex Mobile',
                            Description: "Tekan untuk Mengambil/Menghapus Apex Mobile Role",
                            value: 'apexm',
                        },
                        {
                            label: 'Genshin Impact',
                            Description: "Tekan untuk Mengambil/Menghapus Genshin Impact Role",
                            value: 'genshin',
                        },
                    ]),
            );

        const row2 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('PC Game')
                    .setPlaceholder('PC Game')
                    .addOptions([
                        {
                            label: 'Point Blank',
                            Description: "Tekan untuk Mengambil/Menghapus Point Blank Role",
                            value: 'pb',
                        },
                        {
                            label: 'GTA V',
                            Description: "Tekan untuk Mengambil/Menghapus GTA V Role",
                            value: 'gta',
                        },
                        {
                            label: 'Valorant',
                            Description: "Tekan untuk Mengambil/Menghapus Valorant Role",
                            value: 'valo',
                        },
                        {
                            label: 'DOTA',
                            Description: "Tekan untuk Mengambil/Menghapus DOTA Role",
                            value: 'dota',
                        },
                        {
                            label: 'Apex Legend',
                            Description: "Tekan untuk Mengambil/Menghapus Apex Legend Role",
                            value: 'apexpc',
                        },
                    ]),
            );


        await message.channel.send({ files: [attachment], components: [row1, row2] });
    }
}