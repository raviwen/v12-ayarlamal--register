const Discord = require('discord.js')
const client = new Discord.Client({ fetchAllMembers: true})
const fs = require('fs')
const ms = require('ms')
const db = require('quick.db')
const main = require('./Main.json')
const moment = require('moment')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Set();

client.on('ready', async () => {
    let Voice = client.channels.cache.get(main.BotVoice);
    if(Voice) Voice.join().catch(err => console.log('Ses kanalına bağlanamadım.'))
    client.user.setActivity(`${main.Status}`, { type: 'WATCHING'})
    .then(console.log(`${client.user.tag} İsmiyle Discord APİ Bağlantısı kuruldu.`))
    .catch(() => console.log(`Bir hata ile karşılaştım.`))
})

fs.readdir('./Register', (err, files) => { 
    files.forEach(fs => { 
    let command = require(`./Register/${fs}`); 
    client.commands.set(command.config.name, command);
    if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
    });
  });
  client.on('message', async message => {
    if (!message.guild || message.author.bot || message.channel.type === 'dm') return;
    let prefix = main.Prefix.filter(p => message.content.startsWith(p))[0]; 
    if (!prefix) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(prefix.length); 
    let load = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
    if (load){
     if (!message.member.hasPermission(8) && client.cooldown.has(message.author.id)) return message.channel.send(new MessageEmbed().setDescription('**5** Saniyede bir komut kullanabilirsin.').setFooter(main.Footer).setColor('RANDOM').setTimestamp());
      client.cooldown.add(message.author.id);
      setTimeout(() => client.cooldown.delete(message.author.id), 5000);
      load.raviwen(client, message, args);
    };
  });

  client.on('guildMemberAdd', async member => {
    const kanal = db.fetch(`hgkanal.${member.guild.id}`);
    const kayıtsız = db.fetch(`kayıtsız.${member.guild.id}`);
    const yetkili = db.fetch(`yetkili.${member.guild.id}`);

    await member.roles.add(kayıtsız)
    require('moment-duration-format')
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
     üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
       return {
         '0': `0`, // Emojili yapmak istiyorsan sayı olan yerleri emoji ıd olarak değiştir örnek ; '0': `\<a:true:784308472728256522> ` 
         '1': `1`,
         '2': `2`,
         '3': `3`,
         '4': `4`,
         '5': `5`,
         '6': `6`,
         '7': `7`,
         '8': `8`,
         '9': `9`}[d];})}
         let user = client.users.cache.get(member.id);
         const kurulus = new Date().getTime() - user.createdAt.getTime();  
         const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
         var kontrol;
         if (kurulus < 1296000000) kontrol = `hesabın güvenilir gözükmüyor. :negative_squared_cross_mark:`
         if (kurulus > 1296000000) kontrol = `hesabın güvenilir gözüküyor. :white_check_mark:`
           moment.locale("tr");
         client.channels.cache.get(kanal).send(`
         Sunucumuza hoşgeldin <@`+ member + `> Seninle beraber **`+üyesayısı+`** kişiye ulaştık. \n
         Hesabın \``+gecen+`\` süresinde kurulduğu için `+kontrol+` \n
         Birazdan <@&${yetkili}> Sizinle ilgilenecektir. \n
         Solda bulunan kayıt kanalına geçerek kayıt olabilirsiniz. \n
         `)
  })

  client.on('guildMemberAdd', async member => {
    const taglı = db.fetch(`taglı.${member.guild.id}`);
    const taglog = db.fetch(`taglog.${member.guild.id}`);
      if(member.user.username.includes(main.Tag)){
          await member.roles.add(taglı)
          member.guild.channels.cache.get(taglog).send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${member} Aramıza doğutan taglı şekilde katıldı.`))
      }
  })

  client.on('userUpdate', async (oldUser, newUser) => {
    const guild = client.guilds.cache.get(main.GuildID)
    const member = guild.members.cache.get(newUser.id)
    const taglı = db.fetch(`taglı.${member.guild.id}`);
    const taglog = db.fetch(`taglog.${member.guild.id}`);
    const booster = db.fetch(`booster.${member.guild.id}`);
    const kayıtsız = db.fetch(`kayıtsız.${member.guild.id}`);


    if(newUser.username !== oldUser.username){
        if(oldUser.username.includes(main.Tag) && !newUser.username.includes(main.Tag)){
            member.roles.cache.has(booster) ? member.roles.set([booster, kayıtsız]) : member.roles.set([kayıtsız])
            member.guild.channels.cache.get(taglog).send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${newUser} Tagı bırakarak aramızdan ayrıldı. Bütün rollerini çekip kayıtsıza gönderdim.`))
         }  else if(!oldUser.username.includes(main.Tag) && newUser.username.includes(main.Tag)) {
            await member.roles.add(taglı)
            member.guild.channels.cache.get(taglog).send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${member} Tagı alarak ailemize katıldı.`))
         }
    }
  })





















  client.login(main.Token).catch(() => console.log('Tokenini kontrol edebilir misin ?'))
