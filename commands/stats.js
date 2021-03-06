const { SlashCommandBuilder } = require('@discordjs/builders');
// const CHAMPION_JSON_PATH = process.env.CHAMPION_JSON_PATH
// const leagueData = require(CHAMPION_JSON_PATH)
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const axios = require('axios').default


module.exports = {

	data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Replies with summoner\'s (user) stats')
        .addStringOption(option => option.setName('region').setDescription('Select Region')
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
            .addChoice('Turkey (TR1)', 'TR1'))
        .addStringOption(option => option.setName('summoner_name').setDescription('Enter summoner name').setRequired(true)),

	async execute(interaction) {

        var region = interaction.options.getString('region')
        var summonerName = interaction.options.getString('summoner_name')
        await axios({
            method: 'get',
            url: `https://${region.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName.toLowerCase()}/?api_key=${process.env.RIOT_API_KEY}`,
        })

        .then(response => {
            const summonerData = response.data
            const uggLink = `https://u.gg/lol/profile/${region.toLowerCase()}/${summonerName.toLowerCase()}/overview`
            const opggLink = `https://na.op.gg/summoners/${region.toLowerCase()}/${summonerName.toLowerCase()}`
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton().setLabel('View Stats (U.GG)').setURL(uggLink).setStyle('LINK'),
				new MessageButton().setLabel('View Stats (OP.GG)').setURL(opggLink).setStyle('LINK'),
			);
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${summonerData.name} (${region})`)
                .setDescription(`Summoner level: ${summonerData.summonerLevel}`)
                .setTimestamp()
            console.log("Found summoner")
            interaction.editReply({ephemeral: true, embeds: [embed], components: [row] });
        })

        .catch(() => {
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle(`${summonerName} (${region}) Summoner Not Found`)
                .setDescription('Please check the spelling and region of the summoner and retry')
            console.log("Summoner doesn't exist")
            interaction.editReply({ephemeral: true, embeds: [embed] });
        })
	},
};