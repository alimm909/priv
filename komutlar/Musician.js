const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
exports.run = async(client, message, args, ops, member) => {
  
if(!message.member.roles.cache.get(ayarlar.yetenekverici) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

   let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

if(user) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`Geçerli bir üye berlirtmelisin!`))


let embed = new Discord.MessageEmbed()
.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setDescription(`${user} Başarı İle **Müzisyen** Rolü Verildi!`)
.setTimestamp()
.setFooter(message.author.tag , message.author.avatarURL())
user.roles.add(ayarlar.musician)



}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: 'Musician',
  description: 'Kullanıcı İçin Doğrulandı Rolünü Verir.',
  usage: 'musician'
};