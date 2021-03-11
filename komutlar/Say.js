const Discord = require("discord.js")
const config = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    var tagli = message.guild.members.cache.filter(member => member.user.username.includes((config.tag))).size
    let knavesesli = 0;
    for (const [id, voiceChannel] of voiceChannels) knavesesli += voiceChannel.members.size;
      const emoji = client.emojis.cache.find(emoji => emoji.id === "812008749816217672")
  const knaveembed = new Discord.MessageEmbed()
  .setColor("BLACK")
        .setDescription(`<a:lux:812008725694513192>Seste toplam **${knavesesli}** kullanıcı var.  \n <a:lux:812008725694513192> Toplam **${tagli}** kişi tagımıza sahip. \n <a:lux:812008725694513192>Sunucumuzda toplam **${message.guild.memberCount}** üye var. \n \<a:lux:812008725694513192> Sunucumuza **${message.guild.premiumSubscriptionCount}** takviye yapılmış. \n <a:lux:812008725694513192>Sunucumuzda toplam **${message.guild.members.cache.filter(m => m.presence.status !== "offline").size}** çevrimiçi üye var.`)
 
  message.channel.send(knaveembed)
  message.react(emoji)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["info"],
  permLevel: 0
};
exports.help = {
  name: 'say',
  description: '',
  usage: 'say'
}; 