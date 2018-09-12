const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID

exports.run = (client,message,args,config)=>{
    if(message.author.id!==userID) return
    config.status='on'
    message.channel.send('```Ousama Game Start! chat `ousama join` to join```')
    client.user.setActivity('Ousama game',{
		type:'PLAYING'
	})
}