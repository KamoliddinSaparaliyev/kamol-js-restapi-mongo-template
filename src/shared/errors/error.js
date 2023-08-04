const express = require("express");
const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require(".");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @param {express.ErrorRequestHandler} err
 * @returns
 */
const errorMiddlewareFunc = (err, req, res, next) => {
  let status = 500;

  if (err instanceof BadRequestError) status = 400;
  else if (err instanceof UnauthorizedError) status = 401;
  else if (err instanceof ForbiddenError) status = 403;
  else if (err instanceof NotFoundError) status = 404;
  else if (err instanceof ConflictError) status = 409;

  console.log(err.message);

  return res.status(status).json({ error: err.message });
};
module.exports = errorMiddlewareFunc;
