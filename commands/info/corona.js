const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'corona',
	category: 'info',
  description: 'Menampilkan statistik berita tentang COVID-19',
	run: async (client, message, args) => {
		const baseUrl = 'https://corona.lmao.ninja/v2';

		let url; let response; let
			corona;

		try {
			url = args[0] ? `${baseUrl}/Negara/${args[0]}` : `${baseUrl}/all`;
			response = await axios.get(url);
			corona = response.data;
		} catch (error) {
			return message.channel.send(`***${args[0]}*** tidak ada, atau data tidak dikumpulkan`);
		}

		const embed = new MessageEmbed()
			.setTitle(args[0] ? `${args[0].toUpperCase()} Stats` : 'Total Kasus Corona di Seluruh Dunia')
			.setColor('#fb644c')
			.setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
			.addFields(
				{
					name: 'Total Kasus:',
					value: corona.cases.toLocaleString(),
					inline: true,
				},
				{
					name: 'Total Kematian:',
					value: corona.deaths.toLocaleString(),
					inline: true,
				},
				{
					name: 'Total yang sembuh:',
					value: corona.recovered.toLocaleString(),
					inline: true,
				},
				{
					name: 'Kasus yang ditangani:',
					value: corona.active.toLocaleString(),
					inline: true,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: true,
				},
				{
					name: 'Kasus Kritis:',
					value: corona.critical.toLocaleString(),
					inline: true,
				},
				{
					name: 'Pemulihan hari ini:',
					value: corona.todayRecovered.toLocaleString().replace('-', ''),
					inline: true,
				},
				{
					name: 'Kematian hari ini:',
					value: corona.todayDeaths.toLocaleString(),
					inline: true,
				},
			);

		return message.channel.send({ embeds: [embed] });
	},
};