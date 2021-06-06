const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Main = require('../Main.json')

module.exports.config = { 
    name: 'vip',
    aliases: ['vip-ver','vipver']
}

module.exports.raviwen = async(client, message, args, config) => {

    let yanlis = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor('RED').setFooter(Main.Footer)

    const yetkili = db.fetch(`yetkili.${message.guild.id}`);
    if(!yetkili) return message.channel.send('Yetkili Rolü Ayarlı Değil').then(x => x.delete({timeout:2000}))
    const booster = db.fetch(`booster.${message.guild.id}`);
    if(!booster) return message.channel.send(yanlis.setDescription(`Booster rolü ayarlı değil.`))
    const vip = db.fetch(`vip.${message.guild.id}`);
    if(!vip) return message.channel.send(yanlis.setDescription(`VİP Rolü ayarlı değil.`))

    //
    if(![yetkili].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(yanlis.setDescription('Gerekli yetkilere sahip değilsin.'))
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription(`Bir üye belirtmen gerekiyor.`))



    await uye.roles.add(vip)
    message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic:true})).setDescription(`Kişiye başarıyla <@&${vip}> rolü verildi.`))
    
    db.push(`isim.${uye.id}`, {
        userID: uye.id,
        isimleri: uye.user.username,
        role: `<@&${vip}>`,
        teyitciid: message.author.id,
        teyitcisim: message.author.username
    })
};