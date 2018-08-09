const { Db, Quote } = require("../Other/Db.js");
const UserUtils = require("../Utils/User.js");

const run = (client, message, args) => {
  if (args[0]) {
    user = UserUtils.GetUser(message, args[0]);
    if (user == null) {
      message.channel.send("Could not find user");
      return;
    }
  }

  if (args[1]) {
    quote = args.slice(1).join(" ");
  } else if (args[0]) {
    var lastMessage = message.channel.messages
      .last(100)
      .filter(m => m.author.id == user.id)
      .pop();
    quote = lastMessage.content;
  } else {
    var lastMessage = message.channel.messages.last(2)[0];
    user = lastMessage.author;
    quote = lastMessage.content;
  }

  Db.AddQuote(new Quote(user.username, user.id, quote));

  message.channel.send(
    "Done! (Added `" + quote + "` by " + user.username + ")"
  );
};

module.exports = {
  run
};
