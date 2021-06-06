const { MessageEmbed } = require('discord.js');
const main = require('../Main.json')
const db = require('quick.db')
const moment = require('moment')
module.exports.config = { 
    name: 'unreg',
    aliases: ['kayıtsız']
}

module.exports.raviwen = async(client, message, args, config) => {

    let hata = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor('RED').setFooter(main.Footer)
    const booster = db.fetch(`booster.${message.guild.id}`);
    if(!booster) return message.channel.send('Booster Rolü Ayarlı Değil').then(x => x.delete({timeout:2000}))
    const yetkili = db.fetch(`yetkili.${message.guild.id}`);
    if(!yetkili) return message.channel.send('Yetkili Rolü Ayarlı Değil').then(x => x.delete({timeout:2000}))
    const kayıtsız = db.fetch(`kayıtsız.${message.guild.id}`);
    if(!kayıtsız) return message.channel.send('Kayıtsız Rolü Ayarlı Değil').then(x => x.delete({timeout:2000}))

    //
    if(![yetkili].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(hata.setDescription('Gerekli yetkilere sahip değilsin.'))
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(hata.setDescription(`Bir üye belirtmen gerekiyor.`))
    if(uye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(hata.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.'))
    

    await uye.setNickname(uye.user.username)
    await uye.roles.cache.has(booster) ? uye.roles.set([booster, kayıtsız]) : uye.roles.set([kayıtsız]);

    message.channel.send(new MessageEmbed().setFooter(message.author.username, message.author.avatarURL({ dynamic: true })).setDescription(`Kişi başarıyla kayıtsıza atıldı.`))

};