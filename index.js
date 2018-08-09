const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const Add = require("./Commands/Add.js");
const List = require("./Commands/List.js");
const Random = require("./Commands/Random.js");

var quotes = [];

var quote = {
  username: "",
  text: "",
  userId: ""
};

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity("Online");
});

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

  if (command == "add") {
    Add.run(client, message, args);
  } else if (command == "random") {
    Random.run(client, message, args);
  } else if (command == "list") {
    List.run(client, message, args);
  } else if (command == "quit" && message.author.id == config.ownerID) {
    client.user.setActivity("Offline");
    process.exit(0);
  } else {
    message.channel.send("I do not recognise this command.");
    return;
  }
});

client.login(config.privateToken);
