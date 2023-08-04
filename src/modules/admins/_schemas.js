const Joi = require("joi");
const { pageSchema, buildSortSchema } = require("../../shared/global-schema");

module.exports.postUserSchema = {
  body: Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

module.exports.patchUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    full_name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
  }),
};
module.exports.patchUserMeSchema = {
  body: Joi.object({
    full_name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
  }),
};

module.exports.updatePasswordSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    password: Joi.string().required(),
  }),
};

module.exports.deleteUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

module.exports.listUsersSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: buildSortSchema(["full_name", "username"]),
    page: pageSchema,
    filters: {
      is_deleted: Joi.boolean().default(false),
      is_super: Joi.boolean().default(false),
    },
  }),
};

module.exports.loginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
