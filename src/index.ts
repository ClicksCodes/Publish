import {
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
} from "discord.js";
import fs from "fs";

const client = new Client({
  intents: [GatewayIntentBits.GuildMessages],
});

client.on("messageCreate", async (message) => {
  if (
    message.content == `<@${client.user!.id}>` ||
    (message.content.includes(`<@${client.user!.id}>`) &&
      message.channel.type != ChannelType.GuildAnnouncement) ||
    message.channel.type == ChannelType.DM
  ) {
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            await new Promise((resolve, reject) =>
              fs.readFile("./help.md", (err, data) =>
                err != null ? reject(err) : resolve(data.toString())
              )
            )
          )
          .setTitle("Publish Help"),
      ],
    });
    return;
  }

  if (message.channel.type != ChannelType.GuildAnnouncement) return;
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

await client.login(process.env["TOKEN"]);
