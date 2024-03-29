import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import type { Command } from "../../structures/types/Command.js";

import {
  dynamicImport,
  readAllFiles,
  capitalizeFirstLetter,
} from "../../miscellaneous/util.js";
import path from "node:path";

const helpCommand: Command = {
  build() {
    return new SlashCommandBuilder()
      .setName("help")
      .setDescription(
        "Shows detailed information about the bot or specific commands."
      )
      .addStringOption((option) =>
        option
          .setName("page")
          .setDescription(
            "Select a specific category. Select all to see all commands and descriptions."
          )
          .setRequired(true)
          .addChoices({ name: "All", value: "all" })
      )
      .toJSON();
  },
  opt: {
    userPermissions: ["SendMessages"],
    botPermissions: ["SendMessages"],
    category: "Information",
    cooldown: 5,
  },
  async execute(interaction: ChatInputCommandInteraction<"cached">) {
    const selectedOption = interaction.options.getString("page", true);

    const helpEmbed = new EmbedBuilder()
      .setDescription(
        `Revver Help | ${capitalizeFirstLetter(selectedOption)} \n`
      )
      .setColor("Random");

    const commandDetails = []; // Array to hold name and description for sorting

    for (const file of readAllFiles(path.join("./dist/commands"))) {
      let commandModule;
      try {
        commandModule = await dynamicImport(`./${file}`);
        if (typeof commandModule.build === "function") {
          const commandData = commandModule.build();
          // Check if we have the name and collect name and description
          if (commandData.name) {
            const description =
              commandData.description ?? "Context menu command."; // Default description for context
            commandDetails.push({ name: commandData.name, value: description });
          }
        } else {
          console.warn(
            `The command at '${file}' does not conform to the expected structure.`
          );
        }
      } catch (error) {
        console.error(`Failed to import command from file '${file}':`, error);
        continue; // Skip this iteration if the command can't be imported
      }
    }

    // Sort commandDetails alphabetically by name
    commandDetails.sort((a, b) => a.name.localeCompare(b.name));

    // Now add sorted command details to the embed
    commandDetails.forEach((detail) => {
      helpEmbed.addFields({ name: detail.name, value: detail.value });
    });

    await interaction.reply({
      embeds: [helpEmbed],
      ephemeral: false,
    });
  },
};

export default helpCommand;