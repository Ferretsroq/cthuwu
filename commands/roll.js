const {SlashCommandBuilder} = require('@discordjs/builders');
const {userMention, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, SelectMenuOptionBuilder } = require('discord.js');

module.exports = 
{
	data: new SlashCommandBuilder()
	.setName('roll')
	.setDescription('Roll a skill!')
	.addNumberOption(option =>
		option.setName('skill')
		.setDescription('The value of your skill')
		.setRequired(true))
    .addStringOption(option =>
        option.setName('for')
        .setDescription('What this roll is for')
        .setRequired(true)),

	async execute(interaction)
	{
        let skillName = interaction.options.getString('for');
        let roll = 1 + Math.floor(Math.random()*100);
        let skillValue = interaction.options.getNumber('skill');
        let half = Math.floor(skillValue/2);
        let fifth = Math.floor(skillValue/5);
        let resultText = `${userMention(interaction.user.id)}\n`;

        if(roll <= fifth)
        {
            resultText += `**Critical Success** for ${skillName} (${roll} out of ${skillValue})`;
        }
		else if(roll <= half)
		{
			resultText += `**Half Success** for ${skillName} (${roll} out of ${skillValue})\n Fifth Success: ${fifth} [:fire: ${roll-fifth} Luck]`;
		}
		else if(roll <= skillValue)
		{
			resultText += `**Success** for ${skillName} (${roll} out of ${skillValue})\n Half Success: ${half} [:fire: ${roll-half} Luck]\n Fifth Success: ${fifth} [:fire: ${roll-fifth} Luck]`;
		}
		else
		{
			resultText += `**Fail** for ${skillName} (${roll} out of ${skillValue})\n Success: ${skillValue} [:fire: ${roll-skillValue} Luck]\n Half Success: ${half} [:fire: ${roll-half} Luck]\n Fifth Success: ${fifth} [:fire: ${roll-fifth} Luck]`;
		}
		await interaction.reply({content: resultText})
	},
}