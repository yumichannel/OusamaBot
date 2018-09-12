const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID

exports.run = (client,message,args,config)=>{
    if(message.author.id!==userID){
        return
    }
    config.status='off'
    config.joined= 0,
    config.player=[],
    config.check=[]
    message.channel.send('```Ousama Game End!```')
    client.user.setActivity('nothing',{
        type: "WATCHING"
    })
}