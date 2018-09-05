/* global process */

const Discord = require('discord.js')
const client = new Discord.Client()
const userID = process.env.userID
const authorGID = process.env.authorGID
const authorCID = process.env.authorCID
const pre = 'ousama';
var config = {
	status: 'off',
	joined: 0,
	player:[]
}

client.on('ready', () => {
	client.guilds.get(authorGID).channels.get(authorCID).send('Ousama Bot is online!')
});

client.on('message', message => {
	var content = message.content
	var auth = message.member
	var channel = message.channel
	if(channel.name!=='ousama') return
	if(!content.startsWith(pre)) return
	var path = content.split(' ');
	if(path.length<1){
		return
	}
	switch(path[1]){
		case 'on':
			if(auth.id!==userID){
				return
			}
			config.status='on'
			// fs.writeFileSync('config.json',JSON.stringify(config),'utf8')
			channel.send('```Ousama Game Start! chat `ousama join` to join```')
			break
		case 'join':
			if(auth.bot) return
			if(!gameOn()){
				channel.send('```Game is not started yet!```')
				return
			}
			if(config.player.find(m=>m.id===auth.id)!==undefined){
				// channel.send('```'++'```')
				return
			}
			config.player.push({
				id: auth.id,
				num: 0,
				isKing: false
			})
			config.joined++;
			channel.send(auth.displayName+' joined')
			break
			
		// A player out
		case 'out':
			if(auth.bot) return
			if(config.joined===0) return
			let found = config.player.findIndex(m=>m.id===auth.id)
			if(found>-1){
				config.player.splice(found,1)
				config.joined--
				channel.send(auth.displayName+' out')
			}
			break

		// Show list of player
		case 'list':
			let plist = ''
			config.player.forEach(m => {
				plist+=message.guild.member(m.id).displayName+'\n'
			});
			channel.send('```'+'List of player\n--------------\n'+plist+'```')
			break

		//start the game and give numbers
		case 'start':
			gameStart()
			break

		//find The King
		case 'King':
			if(auth.bot) return
			if(auth.id!==userID){
				return
			}
			if(!gameOn()){
				channel.send('```Game is not started yet!```')
				return
			}
			let kingNum = 0
			// config.player[kingNum].isKing=true
			channel.send('Finding The King.').then(message=>{
				let second = 5
				let counting = setInterval(()=>{
					second--
					if(second===-1){
						kingNum = Math.floor(Math.random()*config.joined+1)
						message.edit(`Congratulation! <@${config.player[kingNum-1].id}> is The King. Let's do your job <@${config.player[kingNum-1].id}>`)
						clearInterval(counting)
					}else{
						message.edit(message.content+='.')
					}
				},1000)
			})
			break
		case 'whois':
			let x = parseInt(path[2],10)
			if(x<1 || x>config.joined){
				channel.send('Cannot find '+x)
				return
			}
			channel.send(`Number ${x} is <@${config.player[x-1].id}>`)
			break
		case 'end':
			if(auth.id!==userID){
				return
			}
			reConfig('off',0,[])
			// fs.writeFileSync('config.json',JSON.stringify(config),'utf8')
			channel.send('```Ousama Game End!```')
			break
		case 'restart':
			if(auth.id!==userID){
				return
			}
			if(!gameOn()){
				channel.send('```Game is not started yet```')
				return
			}
			channel.send('Restarting Ousama Game.').then(message=>{
				let second = 3
				let counting = setInterval(()=>{
					second--
					if(second===-1){
						reConfig('on',0,[])
						message.edit('Ousama Game restarted!')
						clearInterval(counting)
					}else{
						message.edit(message.content+='.')
					}
				},1000)
			})
			break
	}

	function gameOn(){
		if(config.status==='on') return true
		return false
	}

	function reConfig(a,b,c){
		config = {
			status: a,
			joined: b,
			player: c
		}
	}
	function gameStart(){
		if(!gameOn()){
			channel.send('```chat "ousama on" to active Ousama Game```')
			return
		}
		if(config.joined===0){
			channel.send('```No player!```')
			return
		}
		let check = []
		for(let i = 0;i<config.joined;i++){
			check.push(1)
		}
		config.player.forEach(m=>{
			do{
				m.num = Math.floor(Math.random()*config.joined+1)
			}while(m.num===0 || isUse(m.num-1,check))
			check[m.num-1]=0
			message.guild.member(m.id).send(`Your number is ${m.num}. Keep it safe! ^^`)
		})
	}
	function isUse(x,a){
		if(a[x]===1) return false
		return true
	}
});

// client.on('message',message=>{
// 	if(message.author.id!==process.env.authorId) return
// 	if(message.content.startsWith('osm changeuser')){
// 		let pathh = message.content.split(' ')
// 		try {
// 			config.userID = pathh[2]
// 			message.channel.send(`<@${pathh[2]}> is the leader now.`)
// 		} catch (error) {
// 			message.channel.send('Syntax error')
// 		}
// 	}
// })

client.login(process.env.clientid);