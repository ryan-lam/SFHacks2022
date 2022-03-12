require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const token = process.env.TOKEN;
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;

// const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });


client.once('ready', () => {
	console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
    console.log("WORKEDD")
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
    
	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.on("messageCreate", async message => {

   
    const content = message.content
    console.log(content)

    if (content === 'ping') {
		await message.reply('Pong!');
	} else if (content === 'server') {
		await message.reply('Server info.');
	} else if (content === 'user') {
		await message.reply('User info.');
	}
});
// Login to Discord with your client's token

client.login(token);

