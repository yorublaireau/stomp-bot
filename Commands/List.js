const { Db, Quote } = require("../Other/Db.js");
const UserUtils = require("../Utils/User.js");

const run = (client, message, args) => {
  if (args[0]) {
    var user = UserUtils.GetUser(message, args[0]);

    if (user == null) return;

    message.channel.send(
      "Last 10 quotes by " +
        user.username +
        ":\n" +
        Db.ListQuotesPerUserId(user.id, 10)
    );
    return;
  }
  message.channel.send("Last 10 Quotes:\n" + Db.ListQuotes(10));
};

module.exports = {
  run
};
