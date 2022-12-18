import {
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
} from "discord.js";
import fs from "fs";

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author === client.user) return;

  if (
    message.channel.type === ChannelType.DM ||
    message.content === `<@${client.user!.id}>` ||
    (message.content.includes(`<@${client.user!.id}>`) &&
      message.channel.type !== ChannelType.GuildAnnouncement)
  ) {
    if (
      !(
        message.channel.type === ChannelType.DM ||
        message.channel.permissionsFor(client.user!)?.has("SendMessages")
      )
    )
      return;
    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            await new Promise((resolve, reject) =>
              fs.readFile("./src/help.md", (err, data) =>
                err !== null ? reject(err) : resolve(data.toString())
              )
            )
          )
          .setTitle("Publish Help"),
      ],
    });
    return;
  }

  if (message.channel.type !== ChannelType.GuildAnnouncement) return;
  if (!message.channel.permissionsFor(client.user!)?.has("ManageMessages"))
    return;

  if (message.channel.topic?.includes("{no_autopublish}")) return;
  if (
    message.channel.topic?.includes("{no_autopublish:bots}") &&
    message.author.bot
  ) {
    return;
  }
  if (
    message.channel.topic?.includes("{no_autopublish:humans}") &&
    !message.author.bot
  ) {
    return;
  }

  if (message.content.startsWith("=>")) return;

  await message.crosspost();
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

await client.login(process.env["TOKEN"]);
