const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('champion')
		.setDescription('View stats of a Champion')
        .addStringOption(option => option.setName('name').setDescription('Enter Champion name')),

	async execute(interaction) {
        const championName = interaction.options.getString('name');
        
        if (championName == null) {
            await interaction.reply('Please enter a champion name');
        } else {
            await interaction.reply(`${championName}`);
        }
	},
};