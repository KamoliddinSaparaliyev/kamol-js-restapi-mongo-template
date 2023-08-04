const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require("./User");
const config = require("../../shared/config");
const { NotFoundError, UnauthorizedError } = require("../../shared/errors");

const login = async ({ username, password }) => {
  const existing = await User.findOne({ username, is_deleted: false });
  if (!existing) throw new NotFoundError("User not found");

  const match = await compare(password, existing.password);
  if (!match) throw new UnauthorizedError("Username or password wrong");

  const token = sign(
    { user: { id: existing._id, is_super: existing.is_super } },
    config.jwt.secret,
    {
      expiresIn: "1d",
    }
  );

  return { token };
};

module.exports = login;
