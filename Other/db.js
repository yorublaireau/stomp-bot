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
}

class Db {
  constructor() {
    this.quotes = [];
  }

  AddQuote(quote) {
    this.quotes.push(quote);
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
