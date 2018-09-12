const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID

exports.run = (client,message,args,config)=>{
    if(message.author.bot) return
    if(message.author.id!=userID) return
    if(config.status=='off'){
        message.channel.send('```Game is not started yet!```')
        return
    }
    let kingNum = 0
    // config.player[kingNum].isKing=true
    message.channel.send('Finding The King').then(m=>{
        let second = 5
        let counting = setInterval(()=>{
            second--
            if(second===-1){
                kingNum = Math.floor(Math.random()*config.joined+1)
                m.edit(`Congratulation! <@${config.player[kingNum-1].id}> is The King. Let's do your job <@${config.player[kingNum-1].id}>`)
                clearInterval(counting)
            }else{
                m.edit(m.content+='.')
            }
        },1000)
    })
}