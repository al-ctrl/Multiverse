const client = require('../index.js');
const config = require('../config.json');
const db = require('quick.db');
const MessageAttachment = require('discord.js');
const randomWords = [
  "Selamat Datang",
  "Halo",
  "Salam Kenal",
  "Semoga Betah",
  "Senang bisa Kenal Kak"
];


client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) {
    prefix = config.prefix;
  } else {
    prefix = prefix;
  }

  if (message.content.startsWith(prefix)) {
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args, prefix);
  } else  {
      if (message.content.includes('pp')) {
        message.reply('**Kenapa musti nge P kalo bisa nge W xixixi**');
      } else if (message.content.includes('hello')) {
        message.reply('Hello, World!');
      } else if (message.content.includes(`<@586465318914883584>`)) {
        message.reply(`https://tenor.com/view/aku-siapa-kamu-siapa-aku-siapa-nari-who-are-you-gif-15441539`);
      } else if (message.content.includes('gas')) {
        message.reply(`https://images-ext-2.discordapp.net/external/ltMAC19kezWAFZETM1hFS0oCaqZE33Sr7s09Zythais/%3Fcid%3D73b8f7b1b90daddd7fd7df2043eb80233699302f3250f413%26rid%3Dgiphy.mp4%26ct%3Dg/https/media4.giphy.com/media/10briMdj6tGzHa/giphy.mp4`)
      } else if (message.content.includes('ngocok')){
        message.reply(`https://tenor.com/view/thor-dildo-avenger-gif-10396569`)
      } else if (message.content.includes(`<@692004698869203056>`)) {
        message.reply(`https://tenor.com/view/what-cute-cat-stare-gif-17200625`);
      } else if (message.content.includes(`<@1125398914724540477`)) {
        message.reply("prefix saya adalah **l** dan ketik **lhelp** untuk menemukan apa yang ingin anda ketahui tentang akoehhh <3")
      } else if (message.content.includes('jawir')) {
        const { MessageAttachment } = require('discord.js');

        const image = new MessageAttachment('https://cdn.discordapp.com/attachments/823139644308324403/1134838017585053778/Screenshot_2023-07-29-20-16-58-123_com.instagram.android.png');
        
        message.reply({
          content: "Mudik kemana bang? ke jawa bro",
          files: [image]
        });

      } else if (message.content.includes('INTRODUCTION')) {
        try {
          const randomIndex = Math.floor(Math.random() * randomWords.length);
          const randomWord = randomWords[randomIndex];;
          
          await message.reply(`${randomWord} ${message.author}`);
        } catch (error) {
          console.error(error);
        }
      }
    }
});
