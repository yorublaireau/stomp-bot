const { Db, Quote } = require("../Other/Db.js");
const config = require("../config.json");

const run = (client, message, args) => {
  var quote = Db.GetRandomQuote();

  message.channel.send(
    "```\n" + quote.text + "\n- " + quote.username + "\n```"
  );
};

module.exports = {
  run
};
