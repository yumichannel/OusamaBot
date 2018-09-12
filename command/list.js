const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID

exports.run = (client,message,args,config)=>{
    let plist = ''
    config.player.forEach(m => {
        plist+=message.guild.member(m.id).displayName+'\n'
    });
    message.channel.send('```'+`Number of player: ${config.joined}\n--------------\n`+plist+'```')
}