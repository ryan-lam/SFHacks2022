const { SlashCommandBuilder } = require('@discordjs/builders');
const CHAMPION_JSON_PATH = process.env.CHAMPION_JSON_PATH
const leagueData = require(CHAMPION_JSON_PATH)
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const axios = require('axios').default


module.exports = {

	data: new SlashCommandBuilder()
		.setName('rotations')
		.setDescription('Replies with this week\'s champion rotations'),


	async execute(interaction) {

        const rotationData = await axios({
            method: 'get',
            url: `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.RIOT_API_KEY}`,
        })
        const freeChampionIds = rotationData.data.freeChampionIds.map((Id) => {
            const champion = leagueData.keys[`${Id}`]
            return `- ${champion}\n`
        }).join('')
        const freeChampionIdsForNewPlayers = rotationData.data.freeChampionIdsForNewPlayers.map((Id) => {
            const champion = leagueData.keys[`${Id}`]
            return `- ${champion}\n`
        }).join('')
        console.log(freeChampionIds, freeChampionIdsForNewPlayers)

		await interaction.editReply(`${freeChampionIds}`);
	},
};