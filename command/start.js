const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID

exports.run = (client,message,args,config)=>{
    if(config.status=='off'){
        message.channel.send('```chat "ousama on" to active Ousama Game```')
        return
    }
    if(config.joined==0){
        message.channel.send('```No player!```')
        return
    }
    for(let i = 0;i<config.joined;i++){
        config.check.push(1)
    }
    config.player.forEach(m=>{
        do{
            m.num = Math.floor(Math.random()*config.joined+1)
        }while(m.num==0 || config.check[m.num]==0)
        config.check[m.num-1]=m.id
        message.guild.member(m.id).send(`Your number is ${m.num}. Keep it safe! ^^`)
    })
}