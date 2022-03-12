const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('champ')
		.setDescription('Champ')
        .addStringOption(option => option.setName('text').setDescription('Enter some text')),
	async execute(interaction) {
        const text = interaction.options.getString('text');
		await interaction.reply(`${text}`);
	},
};