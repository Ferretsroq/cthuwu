const {SlashCommandBuilder} = require('@discordjs/builders');
const {userMention, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, SelectMenuOptionBuilder } = require('discord.js');

module.exports = 
{
	data: new SlashCommandBuilder()
	.setName('dmg')
	.setDescription('Roll damage dice!')
	.addNumberOption(option =>
		option.setName('num')
		.setDescription('The number of dice to roll')
		.setRequired(true))
    .addNumberOption(option =>
        option.setName('size')
        .setDescription('The size of dice to roll')
        .setRequired(true))
	.addNumberOption(option =>
		option.setName('bonus')
		.setDescription('The bonus to add to to roll')
		.setRequired(false)),

	async execute(interaction)
	{
        let num = interaction.options.getNumber('num');
        let size = interaction.options.getNumber('size');
		let bonus = interaction.options.getNumber('bonus');
        if(bonus == null)
        {
            bonus = 0;
        }
        let resultText = `${userMention(interaction.user.id)}\n`;

        let roll = 0;
        let rolls = [];
        for(let rollNum = 0; rollNum < num; rollNum++)
        {
            rolls.push(Math.floor(Math.random()*size)+1);
        }
        roll = rolls.reduce((a, b) => a + b, 0) + bonus;
		resultText += `**${roll}**\n-# ${num}d${size}+${bonus}: ${rolls.join('+')}+${bonus}`;


		await interaction.reply({content: resultText})
	},
}