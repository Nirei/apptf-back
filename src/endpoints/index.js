import express, { Router } from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import config from "../../config.js";
import party from "./party";
import user from "./user";
import auth from "./auth";

const api = new Router();

api.use(session({ secret: config.API_SECRET, resave: false, saveUninitialized: false }));
api.use(bodyParser.urlencoded({ extended: false }));
api.use(passport.initialize());
api.use(passport.session());
api.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

api.use("/auth", auth);
api.use(passport.authenticate("local"));
api.use("/user", user);
api.use("/party", party);

const statics = express.static("statics");

export default { api, statics };
