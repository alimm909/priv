const Discord = require('discord.js');
const db = require("quick.db")
const moment = require("moment")
const ayarlar = require('../ayarlar.json')
exports.run = async function (client, message, args) {

    if (!message.member.roles.cache.has(ayarlar.jailci) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag ,message.author.avatarURL()).setDescription('Kullanıcıyı Etiketle Veya id İle İşlem Yap.').setColor("RANDOM"));

  let member = message.guild.member(kullanıcı)
let jailid = await db.fetch('id')
 

      const kanal = message.guild.channels.cache.find(c => c.id == ayarlar.jlog) 
    
let embed = new Discord.MessageEmbed()
.setColor(client.randomrenk())
.setAuthor(message.author.tag, message.author.avatarURL())
.setDescription(`**${kullanıcı} adlı üyenin jaili Açıldı (#${jailid-(-1)})**`)
message.channel.send(embed)


kullanıcı.roles.remove(ayarlar.ceza)
kullanıcı.roles.add(ayarlar.kayıtsız)
kullanıcı.roles.remove(ayarlar.tehlikelihesap)

db.set(`jail_${message.guild.id}_${kullanıcı.id}` , 'var')     
db.add('id',1)



}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'Unjail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebebe'
}