const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID

exports.run = (client,message,args,config)=>{
    if(message.author.id!=userID){
        message.channel.send('```You are not leader```')
        return
    }
    if(config.status=='off'){
        message.channel.send('```Game is not started yet```')
        return
    }
    message.channel.send('Restarting Ousama Game').then(m=>{
        let second = 3
        let counting = setInterval(()=>{
            second--
            if(second===-1){
                let x = config.joined
                config = {
                    status: 'off',
                    joined: x,
                    player:[],
                    check:[]
                }
                m.edit('Ousama Game restarted! You can chose staying or leaving ^^\n--------------------------------------------------------------------------\n')
                clearInterval(counting)
            }else{
                m.edit(m.content+='.')
            }
        },1000)
    })
}