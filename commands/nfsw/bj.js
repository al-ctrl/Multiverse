const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {

        name: "bj",
        description: "Shows random blowjob image",
        category: "nsfw",

     run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            return message.reply({
                content: 'You can use this command in an NSFW channel!',
                
                ephemeral: true
            });
        }
        
        try {
            const response = await axios.get('https://nekos.life/api/v2/img/bj');
            const imageUrl = response.data.url;
            
            const embed = new MessageEmbed()
                .setTitle(':smirk: Blowjob')
                .setColor('RANDOM')
                .setFooter('Tags: bj, blowjob')
                .setURL(imageUrl);
            
            message.reply({ embeds: [embed], files: [imageUrl] });
        } catch (err) {
            console.error(err);
            message.reply('An error occurred while fetching the image.');
        }
    },
};
