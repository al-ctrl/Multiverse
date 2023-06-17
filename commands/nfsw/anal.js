const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {

        name: "anal",
        noalias: [''],
        category: "nsfw",
        description: "Shows random anal image",
        usage: "",
        accessableby: "everyone",

    run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({
                embeds: [{
                    color: 16734039,
                    description: "You can use this command in an NSFW Channel!"
                }]
            });
        }
        
        try {
            const response = await superagent.get('https://nekos.life/api/v2/img/anal');
            const embed = new MessageEmbed()
                .setTitle(":smirk: Anal")
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setFooter('Tags: anal')
                .setURL(response.body.url);
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            message.channel.send('An error occurred while fetching the image.');
        }
    }
};
