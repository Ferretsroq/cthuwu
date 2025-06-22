const {SlashCommandBuilder} = require('@discordjs/builders');
const {userMention, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, SelectMenuOptionBuilder } = require('discord.js');

module.exports = 
{
	data: new SlashCommandBuilder()
	.setName('koots')
	.setDescription('Roll koots dice!')
	.addNumberOption(option =>
		option.setName('num')
		.setDescription('The number of dice to roll')
		.setRequired(true)),

	async execute(interaction)
	{
        let num = interaction.options.getNumber('num');
        
        let resultText = `${userMention(interaction.user.id)}\n`;

        let roll = 0;
        let rolls = [];
        for(let rollNum = 0; rollNum < num; rollNum++)
        {
            let thisRoll = Math.floor(Math.random()*6)+1;
            if(thisRoll == 1 || thisRoll == 2)
            {
                rolls.push(1);
            }
            else if(thisRoll == 3 || thisRoll == 4)
            {
                rolls.push(thisRoll);
            }
            else
            {
                rolls.push(6);
            }
        }
        roll = rolls.reduce((a, b) => a + b, 0);
		resultText += `**${roll}**\n-# ${num}dkoots: ${rolls.join('+')}`;


		await interaction.reply({content: resultText})
	},
}