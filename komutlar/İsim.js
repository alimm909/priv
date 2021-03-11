const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
exports.run = async(client, message, args) => {

    let uye = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!uye) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag , message.author.avatarURL()).setDescription(`Geçerli Bir Üye Bulmalısın!`))
let isim = args.slice(1).join(" | ")
if(!isim) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag , message.author.avatarURL()).setDescription(`Geçerli Bir isim girmelisin!`))
let embed = new Discord.MessageEmbed()
.setColor(client.randomrenk())
.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setDescription(`${uye} Kullanıcı adı başarı ile değiştirildi.`)
  message.channel.send(embed)
  uye.setNickname(`${ayarlar.tag} ${isim}`); 
require('quick.db').push(`${message.guild.id}.${uye.id}.isimler`, `${ayarlar.tag} ${isim}`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["nick"],
  permLevel: 0
};

exports.help = { 
  name: 'İsim', 
  description: 'Yetkilileri Çeker',
  usage: 'yetkilicek',
  kategori: 'yetkili'
};