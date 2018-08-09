const { Db, Quote } = require("../Other/Db.js");
const config = require("../config.json");

const run = (client, message, args) => {
  if (message.author.id !== config.ownerID) return;

  message.channel.send("List of Quotes:\n" + Db.ListQuotes());
};

module.exports = {
  run
};
