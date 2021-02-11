require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
// This TOKEN is in a .env file with the Bot's specific Token from https://discord.com/developers/applications
// If you put your own token in a .env file that reads
// TOKEN=PutWhateverYourTokenIsInHere
// Then put into a Powershell or Bash `node index.js` it should log you into your bot on the server


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getTackleBlock(number) {
  switch(number){
    case 0:
      return("<:attacker_down:809196037859967076>");
    case 1:
      return("<:both_down:809195978052599859>");
    case 2:
    case 3:
      return("<:gentle_push:809196097775337502>");
    case 4:
      return("<:defender_stumbles:809195557553438740> ");
    case 5:
      return("<:defender_down:809195874587639899> ");
    default:
      return("You broke me");
  }
};

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content.startsWith('!block')) {
    const roll = getRandomInt(6);
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.reply(`Rolls ${getTackleBlock(roll)} against ${taggedUser.username}`);
    } else {
      msg.reply(getTackleBlock(roll));
    }

  }
  else if (/^!\d*d\d*$/.test(msg.content)) {
    const command = msg.content.slice(1).split('d');
    const rolls = command[0] || 1;
    const die = command[1];
    let diceRolls = '';
    let total = 0;

    for(let i = 0; i < rolls; i++) {
      const roll = getRandomInt(die) + 1;
      total += parseInt(roll);
      diceRolls += `${(roll)} `;
    };
    msg.reply(`You are trying to roll ${rolls} ${die}-sided ${rolls === 1 ? "die" : "dice"} \n ${diceRolls.slice(0,-1)} \n Total: ${total}`);
  }
  
  else if (msg.content === "WHY?") {
    msg.reply("It's Zed's Fault.");
  }
  
  else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
  else if (msg.content.charAt(0) === "!") {
    msg.reply("Incorrect command");
  }
});
