const express = require("express");
const { ForbiddenError } = require("../../shared/errors");
const httpValidator = require("../../shared/http-validator");
const addUser = require("./add-user");
const listUsers = require("./list-users");
const showUser = require("./show-user");
const login = require("./login-user");
const editUser = require("./edit-user");
const removeUser = require("./remove-user");
const {
  postUserSchema,
  patchUserSchema,
  deleteUserSchmea,
  loginUserSchema,
  showUserSchema,
  listUsersSchema,
} = require("./_schemas");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postUserSchema);

    const result = await addUser(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const patchUser = async (req, res, next) => {
  try {
    httpValidator({ params: req.user.id, body: req.body }, patchUserSchema);
    const result = await editUser({ id: req.params.id, changes: req.body });
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const patchMe = async (req, res, next) => {
  try {
    const result = await editUser(
      { id: req.user.id, changes: req.body },
      patchUserSchema
    );

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getUsers = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, listUsersSchema);

    const result = await listUsers(req.query);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showUserSchema);

    const result = await showUser(req.params);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteUserSchmea);

    const result = await removeUser(req.params);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, loginUserSchema);

    const result = await login(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postUser,
  getUser,
  getUsers,
  patchUser,
  patchMe,
  deleteUser,
  loginUser,
};
