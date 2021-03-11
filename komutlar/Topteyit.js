const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {

let x = message.guild.members.cache.filter(x => db.has(`${message.guild.id}.${x.id}.kayıtSorgu_`))

if(x && x.array().length == 0) {
 return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag , message.author.avatarURL()).setDescription("**Sunucuda Henüz hiç bir kayıt yapılmamış. **").setColor('RANDOM'))
} else {
let obj = []
let kaan = 0
let sorted = x.sort((a,b) => db.get(`${message.guild.id}.${b.id}.kayıtSorgu_`) - db.get(`${message.guild.id}.${a.id}.kayıtSorgu_`)).map((r,index) => `**${++kaan}. ${r.user}** - (\`${r.user.id}\`) **${db.get(`${message.guild.id}.${r.id}.kayıtSorgu_`)}** Kayıt Etmiş!`).slice(0, 10)
let Embed = new Discord.MessageEmbed().
setColor(client.randomrenk())
.setTitle(`**• __Top Teyit Listesi__**`)
.setDescription(sorted)
.setThumbnail(message.author.avatarURL())
message.channel.send(Embed)
}

  


}

exports.conf = {
  enabled: true,
  aliases: ['top-teyit'],
  permLevel: 0
};

exports.help = {
  name: 'Topteyit',
  usage: `topteyit`
}