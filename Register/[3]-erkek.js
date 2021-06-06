const { MessageEmbed } = require('discord.js');
const main = require('../Main.json')
const db = require('quick.db')
const moment = require('moment')

module.exports.config = { 
    name: 'erkek',
    aliases: ['e','man']
}

module.exports.raviwen = async(client, message, args, config) => {

    const yetkili = db.fetch(`yetkili.${message.guild.id}`);
    if(!yetkili) return message.channel.send('Yetkili Rolü Ayarlı Değil').then(x => x.delete({timeout:2000}))
    const kayıtsız = db.fetch(`kayıtsız.${message.guild.id}`);
    if(!kayıtsız) return message.channel.send('Kayıtsız Rolü Ayarlı Değil').then(x => x.delete({timeout:2000}))
    const e1 = db.fetch(`erkek1.${message.guild.id}`);
    if(!e1) return message.channel.send('Erkek **1** Rolü Ayarlı Değil').then(x => x.delete({timeout:2000}))
    const e2 = db.fetch(`erkek2.${message.guild.id}`);
    if(!e2) return message.channel.send('Erkek **2** Rolü Ayarlı Değil').then(x => x.delete({timeout:2000}))


    let embed = new MessageEmbed().setFooter(main.Footer).setColor('RANDOM').setTimestamp().setAuthor(message.author.username, message.author.avatarURL({dyanmic:true})).setThumbnail(message.guild.iconURL({dyanmic:true}));
    let hata = new MessageEmbed().setFooter(main.Footer).setColor('RED').setTimestamp().setAuthor(message.author.username, message.author.avatarURL({dyanmic:true}))

    if(![yetkili].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(hata.setDescription('Gerekli yetkilere sahip değilsin.'))
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    let Name = args[1]
    let Age = args[2]
    if(!uye) return message.channel.send(yanlis.setDescription('Bir kullanıcı belirtmelisin. <@Raviwen/ID>'))
    if(!Name || !Age ) return message.channel.send(yanlis.setDescription(`Yanlış kullanım. ${main.Prefix}e <@Raviwen/ID> <İsim> <Yaş>`))
    if(Age < main.Minyaş) return message.channel.send(yanlis.setDescription(`${main.Minyaş} Yaşından küçük üyeler kayıt edilemez.`))
    if(uye.id === message.author.id) return message.channel.send(yanlis.setDescription('Kendinizi kayıt edemezsiniz.'))
    if(uye.id === message.guild.ownerID ) return message.channel.send(yanlis.setDescription('Sunucu sahibini kayıt edemezsin.'))
    if(uye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(yanlis.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.'))

    const İsim = `${uye.user.username.includes(main.Tag) ? main.Tag : main.UNTag} ${Name} | ${Age}`

    db.add(`yetkili.${message.author.id}.erkek`, 1)
    db.add(`yetkili.${message.author.id}.toplam`, 1)
    let reg = db.fetch(`yetkili.${message.author.id}.toplam`)

    await uye.setNickname(`${İsim}`)
    await uye.roles.add(e1)
    await uye.roles.add(e2)
    await uye.roles.remove(kayıtsız)
    message.channel.send(new MessageEmbed().setColor('RANDOM').setFooter(`${message.author.username} Adlı yetkilinin toplam \`${reg}\` kaydı bulunuyor.`).setAuthor(message.author.username, message.author.avatarURL({ dynamic: true})).setThumbnail(message.guild.iconURL({ dynamic: true })).setDescription(`${uye} Adlı kişi ${message.author} tarafından <@&${e1}> Rolü verilerek kayıt edildi. \n  Kişinin yeni ismi: \`${İsim}\` `))

    db.push(`isim.${uye.id}`, {
        userID: uye.id,
        isimleri: İsim,
        role: `<@&${e1}>`,
        teyitciid: message.author.id,
        teyitcisim: message.author.username
    })
};