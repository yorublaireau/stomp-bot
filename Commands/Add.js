const { Db, Quote } = require("../Other/Db.js");

const IsMoreOrLessEqual = (username, name) => {
  username = username.toLowerCase();
  name = name.toLowerCase();
  return username == name || username.startsWith(name);
};

const IsUser = (member, name) => {
  if (member.user) {
    if (IsMoreOrLessEqual(member.user.username, name)) return true;
  }
  if (member.nickname) {
    if (IsMoreOrLessEqual(member.nickname, name)) return true;
  }

  return false;
};

const GetUser = (message, name) => {
  var guild = message.guild;

  if (!guild) return null;

  var users = guild.members
    .filter(member => IsUser(member, name))
    .map(member => member.user);

  if (users.length == 1) return users[0];

  console.log("No user found: " + users.map(u => u.username).join(", "));

  return null;
};

const run = (client, message, args) => {
  if (args[0]) {
    user = GetUser(message, args[0]);
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
