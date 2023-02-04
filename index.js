const { Client, GatewayIntentBits, ActivityType } = require('discord.js');;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const dotenv = require("dotenv")
dotenv.config()
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'strims',
    description: '(strims.top) Strona na której możemy oglądać na żywo np gale',
  },{
    name: 'filman',
    description: '(filman.cc) Strona na której możemy oglądać za darmo Seriale/Filmy'
}];

client.on("ready", () => {
  console.log(`Zalogowano jako ${client.user.tag}!`);
});

client.on("ready", async () => {
  client.user.setPresence({
    activities: [{ name: `KAMCIOOO-_-#5266`, type: ActivityType.Watching = 3 }],
    status: 'online',
  })
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'strims') {
    await interaction.reply('https://strims.top');
  };

  if (interaction.commandName === 'filman') {
    await interaction.reply('https://filman.cc');
  }
});

const rest = new REST({ version: '10' }).setToken(TOKEN);
client.login(TOKEN);

(async () => {
  try {
    console.log('Rozpoczęto odświeżanie poleceń aplikacji (/).');

    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands });

    console.log('Pomyślnie załadowano polecenia aplikacji (/).');
  } catch (error) {
    console.error(error);
  }
})();
