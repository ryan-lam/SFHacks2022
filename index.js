require('dotenv').config();
// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const token = process.env.TOKEN;
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
// tensorflow
require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');



// const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });

// Start client
client.once('ready', () => {
	console.log('Ready!');
});



// get commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// commands "routing"
client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	console.log(command)

	try {
		if (interaction.commandName === 'tf') {
			await interaction.deferReply();
			await wait(4000);
			await command.execute(interaction);
		} else {
			await command.execute(interaction);
		}
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



// For normal messaging
client.on("messageCreate", async message => {
    const content = message.content
    console.log(content)

	// if (!message.author.bot) {
	if (message.author.id == 272477288640151552) {
		console.log("Checking for toxicity")
		const toxicityThreshold = 0.8
		await toxicity.load(toxicityThreshold).then(model => {
			model.classify([content]).then(data => {
				const identity_attack = data[0].results[0].match
				const insult = data[1].results[0].match
				const obscene = data[2].results[0].match
				const severe_toxicity = data[3].results[0].match
				const sexual_explicit = data[4].results[0].match
				message.reply(`identity_attack:${identity_attack}\ninsult:${insult}\nobscene:${obscene}\nsevere_toxicity:${severe_toxicity}\nsexual_explicit:${sexual_explicit}`)
			})
		})
	}

});



// Login to Discord with your client's token
client.login(token);
