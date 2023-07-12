const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hi")
    .setDescription("Hello!"),
    // komutu geliştirmek istersen guide: https://discordjs.guide/slash-commands/advanced-creation.html
    run: async (client, interaction) => {
      interaction.reply(`https://tenor.com/view/quby-high-five-wave-pentol-qubysani-gif-19935273 `)
    }
 };
