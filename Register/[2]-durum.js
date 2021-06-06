const { MessageEmbed } = require('discord.js');
const main = require('../Main.json')
const db = require('quick.db')

module.exports.config = { 
    name: 'durum',
    aliases: ['guild-status','status']
}

module.exports.raviwen = async(client, message, args, config) => {

    let embed = new MessageEmbed().setFooter(main.Footer).setColor('RANDOM').setTimestamp().setAuthor(message.author.username, message.author.avatarURL({dyanmic:true})).setThumbnail(message.guild.iconURL({dyanmic:true}));
    let hata = new MessageEmbed().setFooter(main.Footer).setColor('RED').setTimestamp().setAuthor(message.author.username, message.author.avatarURL({dyanmic:true}))

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(hata.setDescription(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`));
    const e1 = db.fetch(`erkek1.${message.guild.id}`);
    const e2 = db.fetch(`erkek2.${message.guild.id}`);
    const k1 = db.fetch(`kadın1.${message.guild.id}`);
    const k2 = db.fetch(`kadın2.${message.guild.id}`);
    const kanal = db.fetch(`hgkanal.${message.guild.id}`);
    const yetkili = db.fetch(`yetkili.${message.guild.id}`);
    const kayıtsız = db.fetch(`kayıtsız.${message.guild.id}`);
    const booster = db.fetch(`booster.${message.guild.id}`);
    const vip = db.fetch(`vip.${message.guild.id}`);
    const taglı = db.fetch(`taglı.${message.guild.id}`);
    const taglog = db.fetch(`taglog.${message.guild.id}`);



    message.channel.send(embed.setDescription(`
    \`>\` Kayıt Yetkilisi **|** <@&${yetkili|| `Ayarlanmamış`}>
    \`>\` Hoşgeldin Kanalı **|** <#${kanal || `Ayarlanmamış`}>
    \`>\` Tag Log Kanalı **|** <#${taglog || `Ayarlanmamış`}>
    \`>\` Taglı Rolü **|** <@&${taglı || `Ayarlanmamış`}>
    \`>\` Kayıtsız Rolü **|** <@&${kayıtsız || `Ayarlanmamış`}>
    \`>\` Booster Rolü **|** <@&${booster || `Ayarlanmamış`}>
    \`>\` VİP Rolü **|** <@&${vip || `Ayarlanmamış`}>
    \`>\` Erkek Rolü **1** **|** <@&${e1 || `Ayarlanmamış`}>
    \`>\` Erkek Rolü **2** **|** <@&${e2 || `Ayarlanmamış`}>
    \`>\` Kadın Rolü **1** **|** <@&${k1 || `Ayarlanmamış`}>
    \`>\` Kadın Rolü **2** **|** <@&${k2 || `Ayarlanmamış`}>
    `))
};