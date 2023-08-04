const express = require("express");
const db = require("./db");
const usersRoute = require("./modules/admins/_api");
const errorMiddlewareFunc = require("./shared/errors/error");
const { port } = require("./shared/config");

const app = express();

app.use(express.json());

app.use(errorMiddlewareFunc);

app.use(usersRoute);

db();
app.listen(port, () => {
  console.log(`Server ${port}-portda ishlayapti.`);
});
