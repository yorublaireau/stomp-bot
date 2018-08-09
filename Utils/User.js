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

module.exports = { IsMoreOrLessEqual, IsUser, GetUser };
