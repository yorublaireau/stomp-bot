const { Db, Quote } = require("../Other/Db.js");
const config = require("../config.json");

const run = (client, message, args) => {
  message.channel.send("Last 10 Quotes:\n" + Db.ListQuotes(10));
};

module.exports = {
  run
};
