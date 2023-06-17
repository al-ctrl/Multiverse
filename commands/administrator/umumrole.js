const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageAttachment } = require("discord.js")

module.exports = {
    name: "menurole",
    description: "Reaction Role menggunakan dropdown menu.",
    userPerms: ["ADMINISTRATOR"],
    run: async (client, message, args, prefix) => {
        if (!message.content.startsWith(prefix)) return;
        const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/904137496168894545/994889996622381086/722D0A8E-44B5-44AB-9786-B92B568FCCA2.gif')

        const row1 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('bahasarole')
                    .setPlaceholder('Kamu adalah?')
                    .addOptions([
                        {
                            label: 'Laki - Laki',
                            Description: "Tekan untuk Mengambil/Menghapus Laki - Laki Role",
                            value: 'lanang',
                        },
                        {
                            label: 'Perempuan',
                            Description: "Tekan untuk Mengambil/Menghapus Perempuan Role",
                            value: 'wadon',
                        },
                    ]),
            );

        const row2 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('agerole')
                    .setPlaceholder('Bagaimana dengan Usia Kamu?')
                    .addOptions([
                        {
                            label: '18 +',
                            Description: "Tekan untuk Mengambil/Menghapus 18 + Role",
                            value: '18 +',
                        },
                        {
                            label: '- 18',
                            Description: "Tekan untuk Mengambil/Menghapus - 18 Role",
                            value: '- 18',
                        },
                    ]),
            );


        const row4 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('regionalrole')
                    .setPlaceholder('Dimana Asal Kamu?')
                    .addOptions([
                        {
                            label: 'Sumatra',
                            Description: "Tekan untuk Mengambil/Menghapus Sumatra Role",
                            value: 'sumatra',
                        },
                        {
                            label: 'Sulawesi',
                            Description: "Tekan untuk Mengambil/Menghapus Sulawesi Role",
                            value: 'sulawesi',
                        },
                        {
                            label: 'Kalimantan',
                            Description: "Tekan untuk Mengambil/Menghapus Kalimantan Role",
                            value: 'kalimantan',
                        },
                        {
                            label: 'Jawa',
                            Description: "Tekan untuk Mengambil/Menghapus Jawa Role",
                            value: 'jawa',
                        },
                        {
                            label: 'Pulau Lain',
                            Description: "Tekan untuk Mengambil/Menghapus Pulau Lain Role",
                            value: 'pulaulain',
                        },
                    ]),
            );

        const row5 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('kesubukanrole')
                    .setPlaceholder('Terakhir, Apa Kesibukan Kamu?')
                    .addOptions([
                        {
                            label: 'Work',
                            Description: "Tekan untuk Mengambil/Menghapus Work Role",
                            value: 'work',
                        },
                        {
                            label: 'Mahasiswa/i',
                            Description: "Tekan untuk Mengambil/Menghapus Mahasiswa/i Role",
                            value: 'ngampus',
                        },
                        {
                            label: 'Nolep',
                            Description: "Tekan untuk Mengambil/Menghapus Nolep Role",
                            value: 'nolep',
                        },
                    ]),
            );
        await message.channel.send({ files: [attachment], components: [row1, row2, row4, row5] });
    }
}