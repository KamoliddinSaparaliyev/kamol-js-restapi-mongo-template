const { hash } = require("bcryptjs");
const User = require("./User");
const { BadRequestError } = require("../../shared/errors");

const addUser = async (data) => {
  const existing = await User.findOne({ username: data.username });

  if (existing) throw new BadRequestError("Username already exsist");

  const hashedPassword = await hash(data.password, 10);

  const result = await User.create({
    ...data,
    password: hashedPassword,
  });

  return result;
};

module.exports = addUser;
