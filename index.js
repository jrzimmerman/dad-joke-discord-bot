"use strict";

/**
 * A dad joke bot which returns dad jokes from icanhazdadjoke.com
 */
const fetch = require("node-fetch");
const Discord = require("discord.js");
const client = new Discord.Client();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
if (!DISCORD_TOKEN) {
  console.error("Discord API token not found!");
}

client.on("ready", () => {
  console.log("Dad Joke Bot is ready!");
});

client.on("message", async (message) => {
  if (message.content === "!joke") {
    const getJoke = async () => {
      try {
        const resp = await fetch("https://icanhazdadjoke.com", {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const json = await resp.json();
        const joke = json.joke;

        return joke;
      } catch (error) {
        console.error(error);
      }
    };
    const joke = await getJoke();
    message.channel.send(joke);
  }
});

client.login(DISCORD_TOKEN);
