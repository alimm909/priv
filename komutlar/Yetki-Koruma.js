const Discord = require("discord.js");
const db = require("quick.db");// KHOLD X SERENDIA
exports.run = async (client, message, args) => {
 if(!message.member.roles.cache.has("804380064573554717")) return message.channel.send('Bu komutu kullanmak için ayarlanan yetkiye sahip değilsiniz!')
  let Khold = args[0]
  if(!Khold){
 message.channel.send("Yapılacak işlemi belirtmek için `.yt aç` ya da `.yt kapat` komutunu uygulayın!")
  }// KHOLD X SERENDIA
if(Khold == "Aç" || Khold == "aç" || Khold == "AÇ"){
  message.guild.roles.cache.get("804380064573554717").setPermissions(8)
  message.guild.roles.cache.get("804380066812526655").setPermissions(8)
  message.guild.roles.cache.get("804380065549778985").setPermissions(8)
  return message.channel.send(`Yetkiler başarıyla açıldı!`)
} // KHOLD X SERENDIA
if(Khold == "Kapat" || Khold == "kapat" || Khold == "KAPAT"){
 let arr = ["ADMINISTRATOR","MANAGE_ROLES","KICK_MEMBERS","BAN_MEMBERS","MANAGE_CHANNELS","MANAGE_GUILD"];
 message.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true).map(t => t.setPermissions(0));
 message.channel.send(`Yetkiler başarıyla kapatıldı!`)
}
  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yt','yetki'],
  permLevel: 3
};// KHOLD X SERENDIA
exports.help = { 
  name: "Yetki kapat/aç"
};