const { NotFoundError, BadRequestError } = require("../../shared/errors");
const User = require("./User");
const changePassword = require("./change-password");

const editUser = async ({ id, changes }) => {
  const existing = await User.findOne({ _id: id, is_deleted: false });
  if (!existing) throw new NotFoundError("User not found");

  const existingUsername = await User.findOne({ username: changes.username });
  if (existingUsername) throw new BadRequestError("Username already exsist");

  let hashPassword = {};

  if (changes.password)
    hashPassword.password = await changePassword(
      existing.password,
      changes.password
    );

  const updated = User.findByIdAndUpdate(
    id,
    { ...changes, ...hashPassword },
    { new: true }
  );
  return updated;
};

module.exports = editUser;
