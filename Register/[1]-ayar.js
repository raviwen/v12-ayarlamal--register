const { MessageEmbed } = require('discord.js');
const main = require('../Main.json')
const db = require('quick.db')

module.exports.config = { 
    name: 'ayarla',
    aliases: ['sunucuyu-ayarla','guild-create']
}

module.exports.raviwen = async(client, message, args, config) => {

    let embed = new MessageEmbed().setFooter(main.Footer).setColor('RANDOM').setTimestamp().setAuthor(message.author.username, message.author.avatarURL({dyanmic:true})).setThumbnail(message.guild.iconURL({dyanmic:true}));
    let hata = new MessageEmbed().setFooter(main.Footer).setColor('RED').setTimestamp().setAuthor(message.author.username, message.author.avatarURL({dyanmic:true}))

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(hata.setDescription(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`));
    if(!args[0]) return message.channel.send(hata.setDescription('Yanlış kullanım. Aşşağıda ki komutu kullanınız. \n **>** ayarla yardım '));
    
    if(args[0] === 'erkek' || args[0] === 'man'){
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if(!args[1]) return message.channel.send(hata.setDescription('.ayarla erkek <1/2> <@Etiket/ID>'));
    if(!role) return message.channel.send(hata.setDescription('.ayarla erkek <1/2> <@Etiket/ID>'));


    if(args[1] === '1'){
    const role1 = db.fetch(`erkek1.${message.guild.id}`)
    if(role1) return message.channel.send(hata.setDescription('Zaten **1** Numaralı erkek rolü ayarlanmış.'));
    message.channel.send(embed.setDescription(`Başarıyla **1** Numaralı erkek rolüne ${role} ayarladınız.`))
    await db.set(`erkek1.${message.guild.id}`, role.id)
    }
    if(args[1] === '2'){
        const role2 = db.fetch(`erkek2.${message.guild.id}`)
        if(role2) return message.channel.send(hata.setDescription('Zaten **2** Numaralı erkek rolü ayarlanmış.'));
        message.channel.send(embed.setDescription(`Başarıyla **2** Numaralı erkek rolüne ${role} ayarladınız.`))
        await db.set(`erkek2.${message.guild.id}`, role.id)
    }
    }
    if(args[0] === 'kadın' || args[0] === 'woman'){
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if(!args[1]) return message.channel.send(hata.setDescription('.ayarla kadın <1/2> <@Etiket/ID>'));
        if(!role) return message.channel.send(hata.setDescription('.ayarla kadın <1/2> <@Etiket/ID>'));
    
    
        if(args[1] === '1'){
        const role1 = db.fetch(`kadın1.${message.guild.id}`)
        if(role1) return message.channel.send(hata.setDescription('Zaten **1** Numaralı kadın rolü ayarlanmış.'));
        message.channel.send(embed.setDescription(`Başarıyla **1** Numaralı kadın rolüne ${role} ayarladınız.`))
        await db.set(`kadın1.${message.guild.id}`, role.id)
        }
        if(args[1] === '2'){
            const role2 = db.fetch(`kadın2.${message.guild.id}`)
            if(role2) return message.channel.send(hata.setDescription('Zaten **2** Numaralı kadın rolü ayarlanmış.'));
            message.channel.send(embed.setDescription(`Başarıyla **2** Numaralı kadın rolüne ${role} ayarladınız.`))
            await db.set(`kadın2.${message.guild.id}`, role.id)
        }
    }
    if(args[0] === 'hgkanal' || args[0] === 'hosgeldin'){
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    if(!channel) return message.channel.send(hata.setDescription('.ayarla hgkanal <@Etiket/ID>'));
    const kanal = db.fetch(`hgkanal.${message.guild.id}`, channel.id);
    if(kanal) return message.channel.send(hata.setDescription(`Zaten önceden bir kanal belirtlenmiş.`));
    message.channel.send(embed.setDescription(`Başarıyla ${channel} Adlı kanalı hoşgeldin kanalı olarak ayarladın.`))
    await db.set(`hgkanal.${message.guild.id}`, channel.id); 
    }
    if(args[0] === 'taglog' || args[0] === 'tag-log'){
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!channel) return message.channel.send(hata.setDescription('.ayarla hgkanal <@Etiket/ID>'));
        const taglog = db.fetch(`taglog.${message.guild.id}`, channel.id);
        if(taglog) return message.channel.send(hata.setDescription(`Zaten önceden bir kanal belirtlenmiş.`));
        message.channel.send(embed.setDescription(`Başarıyla ${channel} Adlı kanalı hoşgeldin kanalı olarak ayarladın.`))
        await db.set(`taglog.${message.guild.id}`, channel.id); 
        }
    if(args[0] === 'yetkili' || args[0] === 'kayıtyetkilisi'){
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if(!role) return message.channel.send(hata.setDescription('Bir rol belirtmen gerekiyor.'));
    const yetkili = db.fetch(`yetkili.${message.guild.id}`)
    if(yetkili) return message.channel.send(hata.setDescription(`Önceden rol belirlenmiş.`));
    message.channel.send(embed.setDescription(`Başarıyla **Kayıt Yetkilisi** rolünü ${role} olarak ayarladınız.`));
    await db.set(`yetkili.${message.guild.id}`, role.id)    
    }
    if(args[0] === 'kayıtsız' || args[0] === 'unreg'){
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if(!role) return message.channel.send(hata.setDescription('Bir rol belirtmen gerekiyor.'));
        const yetkili = db.fetch(`kayıtsız.${message.guild.id}`)
        if(yetkili) return message.channel.send(hata.setDescription(`Önceden rol belirlenmiş.`));
        message.channel.send(embed.setDescription(`Başarıyla **Kayıtsız* rolünü ${role} olarak ayarladınız.`));
        await db.set(`kayıtsız.${message.guild.id}`, role.id)    
    }
    if(args[0] === 'booster'){
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if(!role) return message.channel.send(hata.setDescription('Bir rol belirtmen gerekiyor.'));
        const booster = db.fetch(`booster.${message.guild.id}`);
        if(booster) return message.channel.send(hata.setDescription(`Önceden rol belirlenmiş.`));
        message.channel.send(embed.setDescription(`Başarıyla **Booster* rolünü ${role} olarak ayarladınız.`));
        await db.set(`booster.${message.guild.id}`, role.id)    
    }
    if(args[0] === 'vip'){
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if(!role) return message.channel.send(hata.setDescription('Bir rol belirtmen gerekiyor.'));
        const vip = db.fetch(`vip.${message.guild.id}`);
        if(vip) return message.channel.send(hata.setDescription(`Önceden rol belirlenmiş.`));
        message.channel.send(embed.setDescription(`Başarıyla **VİP* rolünü ${role} olarak ayarladınız.`));
        await db.set(`vip.${message.guild.id}`, role.id)    
    }
    if(args[0] === 'taglı'){
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if(!role) return message.channel.send(hata.setDescription('Bir rol belirtmen gerekiyor.'));
        const taglı = db.fetch(`taglı.${message.guild.id}`);
        if(taglı) return message.channel.send(hata.setDescription(`Önceden rol belirlenmiş.`));
        message.channel.send(embed.setDescription(`Başarıyla **Taglı* rolünü ${role} olarak ayarladınız.`));
        await db.set(`taglı.${message.guild.id}`, role.id)    
    }
    if(args[0] === 'help' || args[0] === 'yardım'){
    message.channel.send(embed.setDescription(`
    Ayarlabilir Bilgiler
    --------------------
    \`>\`${main.Prefix}taglog <#Kanal/ID>
    \`>\`${main.Prefix}hgkanal <#Kanal/ID>
    \`>\`${main.Prefix}yetkili <@Raviwen/ID>
    \`>\`${main.Prefix}kayıtsız <@Raviwen/ID>
    \`>\`${main.Prefix}erkek <1/2> <@Raviwen/ID>
    \`>\`${main.Prefix}kadın <1/2> <@Raviwen/ID>
    \`>\`${main.Prefix}booster <@Raviwen/ID>
    \`>\`${main.Prefix}vip <@Raviwen/ID>
    \`>\`${main.Prefix}taglı <@Raviwen/ID>
    `))
    }

};