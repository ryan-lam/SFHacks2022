const { SlashCommandBuilder } = require('@discordjs/builders');
const CHAMPION_JSON_PATH = process.env.CHAMPION_JSON_PATH
const leagueData = require(CHAMPION_JSON_PATH)
// const leagueData = require("./leagueData/championFull.json")
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');


const listOfChampions = [
    'Aatrox',       'Ahri',       'Akali',       'Akshan',     'Alistar',
    'Amumu',        'Anivia',     'Annie',       'Aphelios',   'Ashe',
    'AurelionSol',  'Azir',       'Bard',        'Blitzcrank', 'Brand',
    'Braum',        'Caitlyn',    'Camille',     'Cassiopeia', 'Chogath',
    'Corki',        'Darius',     'Diana',       'Draven',     'DrMundo',
    'Ekko',         'Elise',      'Evelynn',     'Ezreal',     'Fiddlesticks',
    'Fiora',        'Fizz',       'Galio',       'Gangplank',  'Garen',
    'Gnar',         'Gragas',     'Graves',      'Gwen',       'Hecarim',
    'Heimerdinger', 'Illaoi',     'Irelia',      'Ivern',      'Janna',
    'JarvanIV',     'Jax',        'Jayce',       'Jhin',       'Jinx',
    'Kaisa',        'Kalista',    'Karma',       'Karthus',    'Kassadin',
    'Katarina',     'Kayle',      'Kayn',        'Kennen',     'Khazix',
    'Kindred',      'Kled',       'KogMaw',      'Leblanc',    'LeeSin',
    'Leona',        'Lillia',     'Lissandra',   'Lucian',     'Lulu',
    'Lux',          'Malphite',   'Malzahar',    'Maokai',     'MasterYi',
    'MissFortune',  'MonkeyKing', 'Mordekaiser', 'Morgana',    'Nami',
    'Nasus',        'Nautilus',   'Neeko',       'Nidalee',    'Nocturne',
    'Nunu',         'Olaf',       'Orianna',     'Ornn',       'Pantheon',
    'Poppy',        'Pyke',       'Qiyana',      'Quinn',      'Rakan',
    'Rammus',       'RekSai',     'Rell',        'Renata',     'Renekton',
    'Rengar',       'Riven',      'Rumble',      'Ryze',       'Samira',
    'Sejuani',      'Senna',      'Seraphine',   'Sett',       'Shaco',
    'Shen',         'Shyvana',    'Singed',      'Sion',       'Sivir',
    'Skarner',      'Sona',       'Soraka',      'Swain',      'Sylas',
    'Syndra',       'TahmKench',  'Taliyah',     'Talon',      'Taric',
    'Teemo',        'Thresh',     'Tristana',    'Trundle',    'Tryndamere',
    'TwistedFate',  'Twitch',     'Udyr',        'Urgot',      'Varus',
    'Vayne',        'Veigar',     'Velkoz',      'Vex',        'Vi',
    'Viego',        'Viktor',     'Vladimir',    'Volibear',   'Warwick',
    'Xayah',        'Xerath',     'XinZhao',     'Yasuo',      'Yone',
    'Yorick',       'Yuumi',      'Zac',         'Zed',        'Zeri',
    'Ziggs',        'Zilean',     'Zoe',         'Zyra'
  ]
const listOfChampionsLower = listOfChampions.slice().map((str) => str.toLowerCase())


module.exports = {

	data: new SlashCommandBuilder()
		.setName('champion')
		.setDescription('View stats of a Champion')
        .addStringOption(option => option.setName('name').setDescription('Enter Champion name').setRequired(true)),

	async execute(interaction) {
        var championId = interaction.options.getString('name')
        championId = championId.replace(/\s/g, '').toLowerCase()
        const idx =  listOfChampionsLower.indexOf(championId)

        if (idx < 0) {
            await interaction.editReply('Please enter a valid champion name');

        } else {
            championId = listOfChampions[idx]
            const championData = leagueData.data[`${championId}`]
            const championName = championData.name
            const championTitle = championData.title
            const championLore = championData.lore
            const championTags = championData.tags.join(', ')
            // const championAllyTips = championData.allytips
            // const championEnemyTips = championData.enemytips
            const championLink = `https://na.op.gg/champions/${championId.toLowerCase()}`

            const row = new MessageActionRow()
			.addComponents(
				new MessageButton().setLabel('Top Build').setURL(`${championLink}/top`).setStyle('LINK'),
				new MessageButton().setLabel('Jungle Build').setURL(`${championLink}/jungle`).setStyle('LINK'),
				new MessageButton().setLabel('Mid Build').setURL(`${championLink}/mid`).setStyle('LINK'),
				new MessageButton().setLabel('ADC Build').setURL(`${championLink}/adc`).setStyle('LINK'),
				new MessageButton().setLabel('Support Build').setURL(`${championLink}/support`).setStyle('LINK'),
			);
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${championName}, ${championTitle} - [${championTags}]`)
                .setDescription(championLore)
                .setThumbnail(leagueData.championLinks[`${championId}`])
                .addFields(
                    {name: `Q: ${championData.spells[0].name}`, value: `${championData.spells[0].description}`},
                    {name: `W: ${championData.spells[1].name}`, value: `${championData.spells[0].description}`},
                    {name: `E: ${championData.spells[2].name}`, value: `${championData.spells[2].description}`},
                    {name: `R: ${championData.spells[3].name}`, value: `${championData.spells[3].description}`},
                    {name: `Passive: ${championData.passive.name}`, value: `${championData.passive.description}`}
                ).setTimestamp()
            await interaction.editReply({ephemeral: true, embeds: [embed], components: [row] });
        }
	},
};