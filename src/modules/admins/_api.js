const express = require("express");
const {
  postUser,
  getUsers,
  getUser,
  patchUser,
  deleteUser,
  loginUser,
} = require("./_controllers");
const isLoggedIn = require("../../shared/auth/is-loggedin");

const router = express.Router();

router.post("/users", postUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/:id", patchUser);
router.delete("/users/:id", deleteUser);
router.post("/users/login", loginUser);

module.exports = router;
