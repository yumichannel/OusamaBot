const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID

exports.run = (client,message,args,config)=>{
    if(message.author.bot) return
    if(config.joined==0) return
    let found = config.player.findIndex(m=>m.id==message.member.id)
    if(found>-1){
        config.player.splice(found,1)
        config.joined--
        message.channel.send('```'+message.member.displayName+' out```')
    }
}