const client = require("../index.js");
const activities = [
{ name: 'YOUR SERVER', type: 'STREAMING' }, 
{ name: '🎶 Music', type: 'LISTENING' }
];
client.on('ready', () => {
    console.log(`${client.user.username} OREP COK!!!`);
    client.user.setPresence({ status: 'online', activity: activities[0] });
    let activity = 1;
    setInterval(() => {
        activities[2] = { name: `${client.channels.cache.size} Channels`, type: 'WATCHING' };
        activities[3] = { name: `${client.users.cache.size} Babu`, type: 'WATCHING' };
        activities[4] = { name: `yannJg`, type: 'COMPETING' };
        if (activity > 4) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 5000);
})