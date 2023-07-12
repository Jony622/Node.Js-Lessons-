const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help list"),
    run: async (client, interaction) => {
      interaction.reply("To Do list commands: \n" 
      + "`!todo` - for create new todo (or use - `!t`) \n"
      + "`!showtodo` - for check your todos list (or use - `!st`) \n"
      + "`!deletetodo` - for delete your chosen todo (or use - `!dt`) \n"
      +"\n"
      + "If u want to use general todo, you must have `<General todo>` role \n"
      + "`!gtodo` - for create new general todo (or use - `!gt`) \n"
      + "`!gshowtodo` - for check your todos list (or use - `!gst`) \n"
      + "`!gdeletetodo` - for delete your chosen todo (or use - `!gdt`) \n"
      + "\n"
      + "`!clear` - delete 100 messages \n"
      + "`!time` - show how many time you spent at voice channel"
      )
    }
 };
