const {SlashCommandBuilder} = require('@discordjs/builders');
const {userMention, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, SelectMenuOptionBuilder } = require('discord.js');

module.exports = 
{
	data: new SlashCommandBuilder()
	.setName('skill')
	.setDescription('Roll a skill!')
	.addNumberOption(option =>
		option.setName('skill')
		.setDescription('The value of your skill')
		.setRequired(true))
    .addStringOption(option =>
        option.setName('for')
        .setDescription('What this roll is for')
        .setRequired(true))
	.addNumberOption(option =>
		option.setName('bonus')
		.setDescription('The number of bonus dice')
		.setRequired(false))
	.addNumberOption(option =>
		option.setName('penalty')
		.setDescription('The number of penalty dice')
		.setRequired(false)),

	async execute(interaction)
	{
		let bonus = interaction.options.getNumber('bonus');
		let penalty = interaction.options.getNumber('penalty');
        let resultText = `${userMention(interaction.user.id)}\n`;
		let skillName = interaction.options.getString('for');
		let skillValue = interaction.options.getNumber('skill');
		let half = Math.floor(skillValue/2);
		let fifth = Math.floor(skillValue/5);
		let roll = 100;
		let tensValue = 0;
		let tensText = "";

		if(bonus == null && penalty == null)
		{
			roll = 1 + Math.floor(Math.random()*100);
		}
        else if(bonus != null && penalty == null)
		{
			let tens = [];
			let ones = Math.floor(Math.random()*10);
			for(let tensIndex = 0; tensIndex < bonus+1; tensIndex++)
			{
				tens.push(Math.floor(Math.random()*10));
			}
			if(Math.min(...tens) == 0 && ones == 0)
			{
				tens.sort();
				tensValue = tens[tens.findIndex(val=>val>0)];
			}
			else
			{
				tensValue = Math.min(...tens);
			}
			roll = tensValue*10 + ones;
			if(roll == 0)
			{
				roll = 100;
			}
			tensText = `\n\nTens dice rolled: ${tens}`;
		}
		else if(bonus == null && penalty != null)
		{
			let tens = [];
			let ones = Math.floor(Math.random()*10);
			for(let tensIndex = 0; tensIndex < penalty+1; tensIndex++)
			{
				tens.push(Math.floor(Math.random()*10));
			}
			roll = Math.max(...tens)*10 + ones;
			if(roll == 0)
			{
				roll = 100;
			}
			tensText = `\n\nTens dice rolled: ${tens}`;
		}
		else
		{
			let numTens = bonus - penalty;
			let tens = [];
			let ones = Math.floor(Math.random()*10);
			let tensValue = 0;
			for(let tensIndex = 0; tensIndex < Math.abs(numTens)+1; tensIndex++)
			{
				tens.push(Math.floor(Math.random()*10));
			}
			if(numTens >= 0)
			{
				if(Math.min(...tens) == 0 && ones == 0)
				{
					tens.sort();
					tensValue = tens[tens.findIndex(val=>val>0)];
				}
				else
				{
					tensValue = Math.min(...tens);
				}
				roll = tensValue*10 + ones;
			}
			else
			{
				roll = Math.max(...tens)*10 + ones;
			}
			if(roll == 0)
			{
				roll = 100;
			}
			tensText = `\n\nTens dice rolled: ${tens}`;
		}
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
		resultText += tensText;
		await interaction.reply({content: resultText})
	},
}