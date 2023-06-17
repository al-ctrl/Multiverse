const { MessageEmbed, Message, Client } = require('discord.js');
const { readdirSync } = require('fs');
const { stripIndent } = require('common-tags');
let color = '#ff0000';

const create_mh = require('../../functions/menu.js');

module.exports = {
    name: "help",
    aliases: [`h`],
    description: "Menampilkan semua command Bot Starnbitch.",
    run: async (client, message, args, prefix) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;


        let categories = [];
        let cots = [];

        if (!args[0]) {
            let ignored = [
                "test"
            ];
            const emo = {
                info: "❗",
                moderation: "🔧",
                administrator: "⚙️",
                umum: "✨",
                owner: "⭕️",
                user: "☂️",
              nsfw: "💢"
              
            }
          
            let ccate = [];
            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]} - ${dir}`;
                let nome = dir.toUpperCase();

                let cats = new Object();
                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                ccate.push(nome);
            });
            
            const description = stripIndent`
            Prefix Server Saat Ini Adalah ${prefix} 
            Gunakan Menu Drop Down Atau Ikuti Perintah yang Diberikan
            Anda Juga Bisa Mengetik ${prefix}help [category]
            `;
            const embed = new MessageEmbed()
                .setTitle(`Bot Commands`)
                .setDescription(`\`\`\`asciidoc\n${description}\`\`\``)
                .addFields(categories)
                .setImage("https://cdn.discordapp.com/attachments/904137496168894545/994889440537346068/9D271CE1-B722-4823-97A4-170F2EB43D0B.gif")
                .setFooter(
                    `${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color)

            let menus = create_mh(ccate);
            return message.reply({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync("./commands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        );
                        const cmds = commands.map((command) => {
                            let file = require(`../../commands/${dir}/${command}`); //getting the commands again

                            if (!file.name) return "Tidak ada nama Command.";

                            let name = file.name.replace(".js", "");

                            if (client.commands.get(name).hidden) return;


                            let des = client.commands.get(name).description;
                            let emo = client.commands.get(name).emoji;
                            let emoe = emo ? `${emo} - ` : ``;

                            let obj = {
                                cname: `${emoe}\`${name}\``,
                                des
                            }

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "Dalam Proses." : co.cname}`,
                                value: co.des ? co.des : `Tidak ada Deskripsi`,
                                inline: true,
                            }
                            catts.push(dota)
                        });

                        cots.push(dir.toLowerCase());
                    });

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new MessageEmbed()
                            .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                            .setDescription(`Gunakan \`${prefix}help\` diikuti dengan nama perintah untuk mendapatkan informasi lebih lanjut tentang suatu perintah.\nUntuk contoh: \`${prefix}help ping\`.\n\n`)
                            .addFields(catts)
                            .setColor(color)

                        try {
  await interaction.deferUpdate({ ephemeral: true });
  // Lakukan logika atau tindakan lain yang diperlukan
} catch (error) {
  console.error('Terjadi kesalahan saat mengeksekusi respons interaksi:', error);
  await interaction.reply({ content: 'Terjadi kesalahan saat mengeksekusi respons interaksi.', ephemeral: true });
}



                        return interaction.message.edit({ embeds: [combed], components: menus.smenu})
                    };
                };
                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == message.author.id
                };

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                });
                collector.on("collect", select);
                collector.on("end", () => null);

            });

        } else {
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );
                    
                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);
                    if (!file.name) return "No command name.";
                    let name = file.name.replace(".js", "");
                    if (client.commands.get(name).defaultPermission === false) return;
                    let des = client.commands.get(name).description;
                    let emo = client.commands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : ``;
                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }
                    return obj;
                });
                let dota = new Object();
                cmds.map(co => {
                    if (co == undefined) return;
                    dota = {
                        name: `${cmds.length === 0 ? "Dalam Proses." : prefix + co.cname}`,
                        value: co.des ? co.des : `Tidak ada Deskripsi`,
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Gunakan \`${prefix}help\` diikuti dengan nama perintah untuk mendapatkan informasi lebih lanjut tentang suatu perintah.\nUntuk contoh: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.reply({ embeds: [combed] })
            };

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Command tidak valid! Gunakan \`${prefix}help\` Untuk semua command saya!`)
                    .setColor("RED");
                return await message.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    },
                });
            }
            const embed = new MessageEmbed()
                .setTitle("Detail Command:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "Tidak ada nama untuk command ini."
                )
                .addField(
                    "Alias:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "Tidak ada Alias untuk command ini."
                )
                .addField(
                    "Gunakan:",
                    command.usage ?
                    `\`${prefix}${command.name} ${command.usage}\`` :
                    `\`${prefix}${command.name}\``
                )
                .addField(
                    "Deskripsi Command:",
                    command.description ?
                    command.description :
                    "Tidak ada Deskripsi untuk command ini."
                )
                .setFooter(
                    `Request dari: ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return await message.reply({
                embeds: [embed]
            });
        }
    },
}