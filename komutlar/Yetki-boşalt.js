const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send()
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(rol => rol.name === args[0]);
  if (!rol) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.tag , message.author.avatarURL()).setDescription("Geçerli Bİr Rol Gİrmelisin!"))
  
console.log(rol)
let embed = new Discord.MessageEmbed()
.setColor(client.randomrenk())
.setAuthor(message.author.tag , message.author.avatarURL())
.setDescription(`${rol} Adlı roldeki **${rol.members.size}** kişi bulunuyor roldeki kişilerin o rolünü aldım!`)
message.channel.send(embed)
   message.guild.members.cache.filter(x=> x.roles.cache.get(rol.id)).forEach(rols => {
rols.roles.remove(rol)

   })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yetkiboşalt"],
    permLevel: 2
}

exports.help = {
    name: 'Yetki-boşalt @rol',
}