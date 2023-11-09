const { Client, GatewayIntentBits } = require("discord.js");
const { OpenAI } = require("openai");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});

client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) {
      return;
    }

    const getResponse = await openai.chat.completions.create({
      messages: [{ role: "user", content: message.content }],
      model: "gpt-3.5-turbo",
    });

    console.log(getResponse);
    console.log(getResponse);
    message.reply(` ${message.content}`);
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("CHAT GPT BOT IS Online");
