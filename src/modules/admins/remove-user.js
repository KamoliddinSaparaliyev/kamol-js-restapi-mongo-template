const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const removeUser = async ({ id }) => {
  const existing = await User.findOne({
    _id: id,
    is_deleted: false,
    is_super: false,
  });
  if (!existing) throw new NotFoundError("User not found");

  return User.findByIdAndUpdate(id, { is_deleted: true });
};
module.exports = removeUser;
