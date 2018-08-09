let config = {};
if (process.argv[2] == "dev") {
  console.log("STARTING DEV");
  config = require("./config.dev.json");
} else {
  console.log("STARTING LIVE");
  config = require("./config.json");
}

exports.config = config;
