const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const { config } = require("../config.js");
const mapSource = new EnmapLevel({ name: config.enmapDb });
const dbMap = new Enmap({ provider: mapSource });

class Quote {
  constructor(username, userId, text) {
    this.username = username;
    this.userId = userId;
    this.text = text;
  }

  ToShortString() {
    return this.username + ": " + this.text;
  }

  ToString() {
    return "```\n" + this.text + "\n- " + this.username + "\n```";
  }

  GetKey() {
    return this.username + ":" + this.userId + ":" + this.text;
  }
}

class Db {
  get quotes() {
    return (dbMap.get("quotes") || []).map(
      q => new Quote(q.username, q.userId, q.text)
    );
  }
  set quotes(value) {
    dbMap.set("quotes", value);
  }

  AddQuote(quote) {
    var quotes = this.quotes;

    quotes.push(quote);

    this.quotes = quotes;
  }
  ListQuotes(limit = 10) {
    return this.quotes
      .slice(this.quotes.length - limit)
      .map(q => q.ToShortString())
      .join("\n");
  }

  GetRandomQuote() {
    var rand = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[rand];
  }
}

module.exports = { Db: new Db(), Quote };
