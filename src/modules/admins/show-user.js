const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const showUser = async ({ id }) => {
  const user = await User.findOne({ _id: id });

  if (!user) throw new NotFoundError("User not found");

  return user;
};

module.exports = showUser;
