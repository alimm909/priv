const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
	
  if (!message.guild) {
  const ozelmesajuyari = new Discord.MessageEmbed()
 
  return message.author.send('Bot Komutlarını Özelden Kullanamazsınız'); }

if(!message.member.roles.cache.get(ayarlar.ekiprol) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  if(!message.member.voice.channel) return message.channel.send('Sesli Kanalda Değilsin.');
  
const kisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!kisi) return message.channel.send(new Discord.MessageEmbed().setColor('black').setDescription('**Kullanıcı etiketi veya ID sini girmelisiniz**'))
const filter = (reaction, user) => {
    return ['✔️', '❌'].includes(reaction.emoji.name) && user.id === kisi.id;
};
message.channel.send(`${kisi}`)
if(!kisi.voice.channel) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.tag , message.author.avatarURL()).setDescription('Yanına gitmek istediğin kişi sesli kanalda değil!').setColor('black'))
  message.channel.send(new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL())
.setDescription(`<@${kisi.id}>, <@${message.author.id}> Sizin Odanıza Gelme isteği gönderdi.`)
.setColor(client.randomrenk()))
.then(m=>m.react('✔️').then(a=>m.react('❌')).then(s=>
  m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first()

        if (reaction.emoji.name === '✔️') {
            message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(`${message.author.tag}`, message.author.avatarURL()).setColor(client.randomrenk()).setDescription('<@'+message.author.id+'> isteğin kabul edildi. '));
      message.member.voice.setChannel(kisi.voice.channel.id)
        } else {
            message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(`${message.author.tag}`, message.author.avatarURL()).setColor(client.randomrenk()).setDescription('<@'+message.author.id+'> isteğin reddedildi. '))
        }
    })
    ))
  //✔️ ❌
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'Git',
  description: "xD",
  usage: 'git <@kisi>'
}