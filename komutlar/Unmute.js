const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const ms = require('ms');
const moment = require('moment')
const config = require("../ayarlar.json");


module.exports.run = async (client, message, args) => {
  

  
if(![(config.muteci)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
 
const muterol = message.guild.roles.cache.find(r => r.id === (config.muterol))




let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`${message.author},lütfen bir kullanıcı belirt @Knave/İD`)).then(x => x.delete({timeout: 5000}));
  
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor('RANDOM').setDescription(`${message.author}, lütfen bir kullanıcı belirt @Knave/İD`).then(x => x.delete({timeout: 5000}));
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
{
        return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda Olabilir.`)).then(x => x.delete({timeout: 5000}));
} else {

  

message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`${member} Kişisinin Mutesi ${message.author} Tarafından kaldırıldı.`)).then(x => x.delete({timeout: 5000}));
mute.roles.remove(muterol)
message.react((config.onayemoji))
} 


      }}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: 0,
  name: "Unmute"
}

exports.help = {
  name: "Unmute"
};