const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
    //let channel = message.member.voice.channel;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag , message.author.avatarURL()).setDescription("**Bir Kullanıcı Etiketlmelisin veya id girmelisin! **").setColor('RANDOM'))
    if(!member.voice.channel) return message.reply("bu kullanıcı sesli kanalda değil")

    let kanal = member.voice.channel.name

    if(message.member.voice.selfDeaf == true){
        let embed2 = new Discord.MessageEmbed()
        .setColor(client.randomrenk())
        .setAuthor(message.author.tag , message.author.avatarURL())

        .setDescription(`${member} adlı kullanıcı **${kanal}** Kanalında, Kullaklığı Kapalı`)
    
    message.channel.send(embed2)}
        
        else {

            let embed = new Discord.MessageEmbed()
            .setColor(client.randomrenk())
            .setAuthor(message.author.tag , message.author.avatarURL())
            .setDescription(`${member} adlı kullanıcı **${kanal}** Kanalında , Kullaklığı Açık`)
        
        message.channel.send(embed)}

    if(!member.voice.channel) return message.reply("bu kullanıcı sesli kanalda değil")


}

exports.conf = {
  enabled: true,
  aliases: ['nerede'],
  permLevel: 0
};

exports.help = {
  name: 'seskontrol @üye',
  usage: `nerede`
}