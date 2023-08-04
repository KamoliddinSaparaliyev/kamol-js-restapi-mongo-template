const User = require("./User");

const listUsers = async ({ q, page, sort, filters }) => {
  const { limit = 10, offset = 0 } = page || {};
  const { by = "full_name", order = "desc" } = sort || {};
  const { is_deleted = false, is_super = false } = filters || {};
  const filter = {};

  if (q) {
    filter.$or = [
      { full_name: { $regex: q, $options: "i" } },
      { username: { $regex: q, $options: "i" } },
    ];
  }

  if (is_deleted) {
    filter.is_deleted = is_deleted;
  }
  if (is_super) {
    filter.is_super = is_super;
  }
  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .sort({ [by]: order === "desc" ? -1 : 1 })
    .skip(offset)
    .limit(limit)
    .select("-password");
  return { total, limit, offset, users };
};

module.exports = listUsers;
