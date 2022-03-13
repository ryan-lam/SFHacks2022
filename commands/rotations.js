const { SlashCommandBuilder } = require('@discordjs/builders');
const leagueData = require('C:/Users/Ryan Lam/Desktop/SFHacks2022/leagueData/championFull.json')
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