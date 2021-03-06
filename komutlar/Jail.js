const Discord = require('discord.js');
const db = require("quick.db")
const moment = require("moment")
const ayarlar = require('../ayarlar.json')
exports.run = async function (client, message, args) {

    if (!message.member.roles.cache.has(ayarlar.jailci) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag ,message.author.avatarURL()).setDescription('Kullanıcıyı Etiketle Veya id İle İşlem Yap.').setColor("RANDOM"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  let süre = args[1]
let jailid = await db.fetch('id')
let puan = await db.fetch(`cezapuan.${kullanıcı.id}`)

if(message.author.id === kullanıcı.user.id) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.tag , message.author.avatarURL()).setDescription(kullanıcı + " Kendini Jaile Atamazsın!")).then(msg => msg.delete(9000))

 let reason = args.slice(1).join(" ")
      if(!reason) return  message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.tag , message.author.avatarURL()).setDescription("Geçerli Bir Üye Girmelisin")).then(m => m.delete(5000));
         // message.react("EMOJİ ID");
  message.guild.members.cache.get(member.id).roles.cache.forEach(r => {
message.guild.members.cache.get(member.id).roles.remove(r) 

member.roles.add(ayarlar.ceza)
})

db.set(`jail_${message.guild.id}_${kullanıcı.id}` , 'var')     
db.add('id',1)
const kanal = message.guild.channels.cache.find(c => c.id == ayarlar.jlog) 
    const embed1 = new Discord.MessageEmbed() 
    .setAuthor(message.author.tag , message.author.avatarURL())
    .setDescription(`${kullanıcı} üyesine <@&${ayarlar.ceza}> rolü ${message.author} tarafından Verildi. Sebep: ${reason}`)
    .setColor(client.randomrenk())
        require('quick.db').push(`${message.guild.id}.${message.mentions.users.first().id}.sicil`, { tip: "Jail", sebep: args.slice(1).join(' '), yetkili: message.author.id, tarih: require('moment')().format()})

        let puanlogs = message.guild.channels.cache.find(c => c.id == ayarlar.puanlog) 
        puanlogs.send(`${kullanıcı}: aldığınız **#${jailid-(-1)}** ID'li ceza ile ${!puan ? 20 : puan} ceza puanına ulaştınız.`)
        db.add(`cezapuan.${kullanıcı.id}`,5)
        
    //#${jailid-(-1)}
  let embed = new Discord.MessageEmbed() 
  .setColor(client.randomrenk())
  .setAuthor(message.author.tag , message.author.avatarURL())
 .setDescription(`${kullanıcı} üyesine ${message.author} Tarafından <@&${ayarlar.ceza}> rolü Verildi.`)
  message.channel.send(embed)
kanal.send(embed1)
-require("quick.db").add(`${message.guild.id}.${kullanıcı.id}.jailAmount`, 1)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cezalı","cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'Jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebebe'
}