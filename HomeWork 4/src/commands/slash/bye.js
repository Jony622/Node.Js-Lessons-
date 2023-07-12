const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bye")
    .setDescription("Bye!"),
    run: async (client, interaction) => {
      interaction.reply(`https://tenor.com/view/bye-bye-bye-byee-bye-gif-bye-james-gif-25047427`)
    }
 };
