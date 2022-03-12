const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echos text')
        .addStringOption(option => option.setName('text').setDescription('Enter some text')),
	async execute(interaction) {
        const text = interaction.options.getString('text');
		await interaction.reply(`${text}`);
	},
};