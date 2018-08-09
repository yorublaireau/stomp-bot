const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

var quotes = [];

var quote = {
  username: "",
  text: "",
  userId: ""
};

client.on("ready", () => {
  console.log("I am ready!");
});

const IsUser = (user, name) => {
  return user.username == name;
};
const GetUser = (message, name) => {
  var guild = message.guild;

  if (!guild) return null;

  var users = guild.members
    .map(member => member.user)
    .filter(user => IsUser(user, name));

  if (users.length == 1) return users[0];

  return null;
};

client.on("message", message => {
  if (message.author.bot) return;

  if (!message.mentions.users.some(u => u.id == client.user.id)) return;

  var args = message.content.split(/\s+/);

  args.shift();

  if (args.length == 0) {
    message.channel.send("Please do not tag me for no reason.");
    return;
  }

  var command = args.shift().toLowerCase();

  var user;
  var quote = "[quote]";

  if (command == "add") {
    if (args[0]) {
      user = GetUser(message, args[0]);
      if (user == null) {
        message.channel.send("Could not find user");
        return;
      }
    }

    if (args[1]) {
      quote = args[1];
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
  } else if (command == "random") {
    var rand = Math.floor(Math.random() * quotes.length);
    var quote = quotes[rand];
    message.channel.send(
      "```\n" + quote.text + "\n- " + quote.username + "\n```"
    );
    return;
  } else if (command == "list" && message.author.id == config.ownerID) {
    message.channel.send(
      "List of Quotes:\n" +
        quotes.map(q => q.username + ": " + q.text).join("\n")
    );
    return;
  } else {
    message.channel.send("I do not recognise this command.");
    return;
  }

  quotes.push({
    username: user.username,
    text: quote,
    userId: user.id
  });

  message.channel.send(
    "Done! (Added `" + quote + "` by " + user.username + ")"
  );
});

client.login(config.privateToken);
