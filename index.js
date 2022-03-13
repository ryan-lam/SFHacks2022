require('dotenv').config();
// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
// const wait = require('node:timers/promises').setTimeout;
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
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	console.log(`${interaction.user.tag} triggered an interaction: /${command.data.name}`);


	try {
		const deferCommands = ['champion', 'rotations', 'status', 'stats']
		if (deferCommands.includes(interaction.commandName)) {
			console.log('Command Reply Defered')
			await interaction.deferReply();
			// await wait(2500)
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
	console.log(`New message from ${message.author.username}: "${content}"`)

	if (content.charAt(0) == '/') {
		console.log("Invalid Command")
		message.reply('Invalid Command. To see a list of commands, use /help')
		return
	}

	// if (!message.author.bot) {
	// if (message.author.id == 272477288640151552) {
	if (message.author.id == 272477288640151552 || message.author.id == 290951901187538947) {
		console.log("Checking for toxicity")
		const toxicityThreshold = 0.85
		await toxicity.load(toxicityThreshold).then(model => {
			console.log("Loading model")
			model.classify([content]).then(data => {
				console.log("Done checking for toxicity")
				const identity_attack = ["Identity Attack", data[0].results[0].match]
				const insult = ["Insult", data[1].results[0].match]
				const obscene = ["Obscene", data[2].results[0].match]
				const severe_toxicity = ["Severe Toxicity", data[3].results[0].match]
				const sexual_explicit = ["Sexual Explicit", data[4].results[0].match]
				const listOfToxicity = [identity_attack, insult, obscene, severe_toxicity, sexual_explicit]
				.filter((arr) => arr[1]).map((arr) => arr[0])
				console.log(listOfToxicity)

				if (listOfToxicity.length) {
					console.log("111111")
					listOfToxicity.join(', ')
					console.log("222222")
					const embed = new MessageEmbed()
						.setColor('#FF0000')
						.setTitle('TOXICITY WARNING!')
						.setDescription(`Your has been identified as the following toxic behaviour(s): \n${listOfToxicity}`)
					console.log('333333')
					const row = new MessageActionRow().addComponents(
						new MessageButton()
							.setCustomId('DANGER')
							.setLabel('DANGER')
							.setStyle('DANGER'),
					);
					console.log("444444")
					message.reply({ ephemeral: true, embeds: [embed], components: [row] });
					console.log("555555")
					message.delete();
					console.log("666666")
				} else {
					console.log("No toxicity detected")
				}

			})
		})
	}

});



// Login to Discord with your client's token
client.login(token);
