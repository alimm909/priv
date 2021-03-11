const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const data = require("quick.db")
const moment = require("moment")
exports.run = async(client, message, args) => {
    let uye = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!uye) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag , message.author.avatarURL()).setDescription(`Geçerli Bir Üye Bulmalısın!`))

let veri = data.get(`${message.guild.id}.${uye.id}.isimler`)
let yeniVeri = veri.map(x => x).join('\n')
moment.locale("tr")
let embed = new Discord.MessageEmbed()
.setColor(client.randomrenk())
.setAuthor(message.author.tag , message.author.avatarURL())
.setDescription(`
\`İD:\` ${uye.id}
\`Profil:\` ${uye.id}
\`Sunucuya Katılış Tarihi:\` ${moment(uye.joiedAt).fromNow()}

\`•\` **Sunucuda Daha Önce Kayıt Olduğu İsimler;**
${yeniVeri} 

`)
message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["nicks"],
  permLevel: 0
};

exports.help = { 
  name: 'İsimler', 
  description: 'İsimleri Çeker',
  usage: 'isimler',
  kategori: 'yetkili'
};