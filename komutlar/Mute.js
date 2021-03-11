const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require("ms");
exports.run = async (client, message, args) => {
  const embed = (content) => message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("BLACK").setDescription(content));
  if (!message.member.roles.cache.has("804380065549778985") && !message.member.hasPermission("ADMINISTRATOR")) return embed(`Bu komutu kullanmak için ayarlanan yetkiye sahip değilsiniz!`);
  
   const victim = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
   if (!victim) return embed(`Lütfen tüm argümanları doğru yerleştirip tekrar deneyin!\n\n Örnek: \`.mute @khold/ID\ süre\``); 
  
   var reason, emojis = ["📃", "🔊"], filter = (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id;
   if (emojis.length < 1) return embed(`Gerekli emojiler belirtilmiş değil.`);
  
   var time = args[1] && (ms(args[1]) && ["m", "h", "d"].some(x => args[1].includes(x))) ? ms(args[1]) : false; 
  
   embed(`Lütfen cezayı, belirten tepkiye tıklayınız.\n\n${emojis[0]}: CHAT-MUTE\n${emojis[1]}: VOICE-MUTE\n\n• Eğer 30 saniye içinde bir şey seçmezseniz işlem iptal olacaktır`).then((mesaj) => {
     mesaj.react(emojis[0]);
     mesaj.react(emojis[1]);
     
     let collector = mesaj.createReactionCollector(filter, { time: 30000 });
     
     collector.on("collect", (aprax) => {
       const name = aprax.emoji.name;
       
       if (name == emojis[0]) {
        if (time) {
          reason = `${victim} - (\`${victim.id}\`) adlı kullanıcı \`Metin kanallarının işleyişini bozucu hareket\` sebebiyle \`${args[1]}\` boyunca metin kanallarından susturuldu!`;
          mesaj.reactions.removeAll();
          
          victim.roles.add("804388431525707806", { reason: reason }).catch();
          mesaj.delete().then(x => embed(reason));
          
          setTimeout(function () {
            victim.roles.remove("804388431525707806").catch();
            
            embed(`${victim} kullanıcısının susturulma süresi dolduğu için susturulması kaldırıldı.`);
          }, time); 
        } else {
         reason = `${victim} - (\`${victim.id}\`) adlı kullanıcı \`Metin kanallarının işleyişini bozucu hareket\` sebebiyle \`süresiz\` metin kanallarından susturuldu!`;
         mesaj.reactions.removeAll();
         
         victim.roles.add("804388431525707806", { reason: reason }).catch();
         mesaj.delete().then(x => embed(reason));
        };
      } else {
       if (time) { 
        reason = `${victim} - (\`${victim.id}\`) adlı kullanıcı \`Ses kanallarının işleyişini bozucu hareket\` sebebiyle \`${args[1]}\` boyunca ses kanallarından susturuldu!`;
          mesaj.reactions.removeAll();
         victim.roles.add("804388431525707806", { reason: reason }).catch();
          mesaj.delete().then(x => embed(reason));
          
          setTimeout(function () {
            victim.roles.remove("804388431525707806").catch();
            
            embed(`${victim} kullanıcısının susturulma süresi dolduğu için susturulması kaldırıldı.`);
          }, time); 
        } else {
         reason = `${victim} - (\`${victim.id}\`) adlı kullanıcı \`Ses kanallarının işleyişini bozucu hareket\` sebebiyle \`süresiz\` ses kanallarından susturuldu!`;
         
         mesaj.reactions.removeAll();
         victim.voice.setMute(true)
         victim.roles.add("804388431525707806", { reason: reason }).catch();
         mesaj.delete().then(x => embed(reason));
        }
       };
     });
     
     collector.on("end", (aprax) => {
       const size = aprax.size;
       
       if (size < 1) {
         mesaj.edit(`30 saniye içinde seçim yapılmadığı için işlem iptal edildi!`);
         return;
       };
     });
   });;
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};
exports.help = {
  name: "mute"
};
