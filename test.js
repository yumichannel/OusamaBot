/* global process */

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
// var config = JSON.parse(fs.readFileSync('config.json','utf8'));
var config = {
	status: 'off',
	joined: 0,
	player:[]
}
const pre = 'ousama';

client.on('ready', () => {
	console.log('bot is ready');
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
		case 'start':
			if(auth.id!=='201912139240308736'){
				console.log('Không đủ quyền')
				return
			}
			config.status='on'
			// fs.writeFileSync('config.json',JSON.stringify(config),'utf8')
			channel.send('Ousama Game Start! chat `ousama join` để tham gia')
			break
		case 'join':
			if(auth.bot) return
			if(!gameOn()){
				channel.send('Game chưa bắt đầu')
				return
			}
			if(config.player.find(m=>m.id===auth.id)!==undefined){
				channel.send('ban da join')
				return
			}
			config.player.push({
				id: auth.id,
				num: -1,
				isKing: false
			})
			config.joined++;
			channel.send(auth.nickname+' joined')
			break
		case 'out':
			if(auth.bot) return
			if(config.joined===0) return
			let found = config.player.findIndex(m=>m.id===auth.id)
			if(found>-1){
				config.player.splice(found,1)
				config.joined--
				channel.send(auth.nickname+' out')
			}
			break
		case 'list':
			let plist = ''
			config.player.forEach(m => {
				plist+=message.guild.member(m.id).nickname+'\n'
			});
			channel.send('```'+'List of player\n--------------\n'+plist+'```')
			break
		case 'begin':
			gameStart()
			break
		case 'King':
			if(auth.bot) return
			if(auth.id!=='201912139240308736'){
				channel.send('Không đủ quyền')
				return
			}
			if(!gameOn()){
				channel.send('Game chưa bắt đầu')
				return
			}
			let kingNum = Math.floor(Math.random()*config.joined)
			config.player[kingNum].isKing=true
			let second = 3;
			let counting = setInterval(()=>{
				channel.send(second)
				second--
				if(second===-1){
					channel.send(`Chúc mừng <@${config.player[kingNum].id}> đã trở thành vua, hãy thực hiện sứ mệnh của mình, <@${config.player[kingNum].id}>`)
					clearInterval(counting)
				}
			},1000)
			break
		case 'whois':
			let x = parseInt(path[2],10)
			if(path[2]<0 || path[2]>=config.joined){
				channel.send('Không tìm thấy số '+x)
				return
			}
			channel.send(`Số ${x} là <@${config.player[x].id}>`)
			break
		case 'end':
			if(auth.id!=='201912139240308736'){
				console.log('Không đủ quyền')
				return
			}
			reConfig('off',0,[])
			// fs.writeFileSync('config.json',JSON.stringify(config),'utf8')
			channel.send('Ousama Game End!')
			break
		case 'restart':
			if(auth.id!=='201912139240308736'){
				console.log('Không đủ quyền')
				return
			}
			if(!gameOn()){
				channel.send('Game chưa bắt đầu')
				return
			}
			reConfig('on',0,[])
			// fs.writeFileSync('config.json',JSON.stringify(config),'utf8')
			channel.send('Restart Ousama Game')
			break
	}

	client.on('message',message=>{
		if(message.content==='$clearchat'){
			try {
				message.channel.messages.deleteAll()
			} catch (error) {
				message.channel.send('I dont have enough permission')
			}
		}
	})

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
		if(config.status==='off'){
			channel.send('Game chưa bắt đầu, chat `ousama begin` để bắt đầu game')
			return
		}
		if(config.joined===0){
			channel.send('Chưa có ai tham gia game. chat `ousama join` để join game')
			return
		}
		let check = []
		for(let i = 0;i<config.joined;i++){
			check.push(1)
		}
		config.player.forEach(m=>{
			do{
				m.num = Math.floor(Math.random()*config.joined)
			}while(m.num===-1 || isUse(m.num,check))
			check[m.num]=0
			message.guild.member(m.id).send(`Số của bạn là ${m.num}`)
		})
	}
	function isUse(x,a){
		if(a[x]===1) return false
		return true
	}
});


client.login('NDg2MTQ0ODk5NjQ1ODMzMjI2.Dm66Zw.9zw7bWzGdG0SDnRYnixfuoDANNA');