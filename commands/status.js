const { SlashCommandBuilder } = require('@discordjs/builders');
// const CHAMPION_JSON_PATH = process.env.CHAMPION_JSON_PATH
// const leagueData = require(CHAMPION_JSON_PATH)
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default


module.exports = {

	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Replies with region server status')
        .addStringOption(option =>
            option.setName('region')
                .setDescription('Select Region')
                .setRequired(true)
                .addChoice('Brazil (BR1)', 'BR1')
                .addChoice('EU Nordic & East (EUN1)', 'EUN1')
                .addChoice('EU West (EUW1)', 'EUW1')
                .addChoice('Japan (JP1)', 'JP1')
                .addChoice('Korea (KR)', 'KR')
                .addChoice('Latin America North (LA1)', 'LA1')
                .addChoice('Latin America South (LA2)', 'LA2')
                .addChoice('North America (NA1)', 'NA1')
                .addChoice('Oceania (OC1)', 'OC1')
                .addChoice('Russia (RU)', 'RU')
                .addChoice('Turkey (TR1)', 'TR1')),

	async execute(interaction) {

        var region = interaction.options.getString('region').toLowerCase()
        const response = await axios({
            method: 'get',
            url: `https://${region}.api.riotgames.com/lol/status/v4/platform-data?api_key=${process.env.RIOT_API_KEY}`,
        })
        const regionStatus = response.data

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Status for ${regionStatus.name} (${regionStatus.id})`)
            .setDescription(`${response.headers.date}`)
            .addFields(
                {name: 'Maintenances', value: `${regionStatus.maintenances.length}`, inline: true},
                {name: 'Incidents', value: `${regionStatus.incidents.length}`, inline: true},
                {name: 'Locales', value: `${regionStatus.locales.join()}`, inline: true},
            ).setTimestamp()
        console.log("Sent server status")
        await interaction.editReply({ephemeral: true, embeds: [embed] });
	},
};