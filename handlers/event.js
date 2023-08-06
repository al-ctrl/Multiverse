const { readdirSync } = require('fs');
module.exports = (client) => {
  client.events = new Map(); // Tambahkan inisialisasi objek client.events di sini

  const eventFiles = readdirSync('./events/').filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(`../events/${file}`);
    if (event.name) {
      client.events.set(event.name, event);
    } else {
      continue;
    }
  }

  console.log('Event Handler is ready');
};
