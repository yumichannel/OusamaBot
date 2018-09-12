const Discord = require('discord.js')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID
const pre = 'ousama';
var config = {
	status: 'off',
	joined: 0,
    player:[],
    check:[]
}

client.on('ready', () => {
	client.guilds.get(authorGID).channels.get(authorCID).send('Ousama Bot is online!')
	
});

client.on('message', message => {
	if(message.author.bot) return;
	if(message.channel.name!='ousama') return
	if(!message.content.startsWith(pre) || message.channel.type=='dm') return;
	const cmd = message.content.substring(7).split(' ')[0];
	const args = message.content.substring(cmd.length+2).split(' ');
	try{
		let cmdFile = require("./command/"+cmd+".js");
		cmdFile.run(client,message,args,config);
	}catch(err){
	}	
});

client.on('error',error => {
	client.guilds.get(authorGID).channels.get(authorCID).send(`\`\`\`+Ousama Error:\n----------------\n+${error.message}+\`\`\``)
})

client.login(process.env.clientid);