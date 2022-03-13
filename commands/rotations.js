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
        }).sort().join('')
        const freeChampionIdsForNewPlayers = rotationData.data.freeChampionIdsForNewPlayers.map((Id) => {
            const champion = leagueData.keys[`${Id}`]
            return `- ${champion}\n`
        }).sort().join('')

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Champion Rotations (Week of March 8-15, 2022)')
            .setThumbnail('https://static.wikia.nocookie.net/leagueoflegends/images/9/9a/League_of_Legends_Update_Logo_Concept_05.jpg/revision/latest/scale-to-width-down/250?cb=20191029062637')
            .addFields(
                {name: 'Everyone ', value: `${freeChampionIds}`, inline: true},
                {name: 'Players under lv10', value: `${freeChampionIdsForNewPlayers}`, inline: true},
            ).setTimestamp()
        await interaction.editReply({ephemeral: true, embeds: [embed] });
	},
};