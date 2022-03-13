const { SlashCommandBuilder } = require('@discordjs/builders');

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
        var championName = interaction.options.getString('name')
        championName = championName.replace(/\s/g, '').toLowerCase()
        const idx =  listOfChampionsLower.indexOf(championName)

        if (idx < 0) {
            await interaction.editReply('Please enter a valid champion name');

        } else {
            championName = listOfChampions[idx]
            await interaction.editReply(`${championName}`);

            





        }
	},
};