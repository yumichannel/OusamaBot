const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID

exports.run = (client,message,args,config)=>{
    if(message.author.bot) return
    if(config.status=='off'){
        message.channel.send('```Game is not started yet!```')
        return
    }
    if(config.player.find(m=>m.id==message.member.id)!==undefined){
        return
    }
    config.player.push({
        id: message.member.id,
        num: 0,
        isKing: false
    })
    config.joined++;
    message.channel.send("```"+message.member.displayName+' joined```')
}