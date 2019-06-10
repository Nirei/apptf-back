import path from "path";
import express, { Router } from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import config from "../../config.js";
import party from "./party";
import user from "./user";
import auth from "./auth";

const STATICS_DIR = "statics";
const api = new Router();
const statics = new Router();

api.use(
  session({
    secret: config.API_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
api.use(bodyParser.json());
api.use(passport.initialize());
api.use(passport.session());
api.use(function(req, res, next) {
  if (req.method in ["POST", "PUT", "GET", "DELETE"]) {
    res.header("Content-Type", "application/json");
  }
  res.header("Access-Control-Allow-Origin", config.ORIGIN_WHITELIST);
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

api.use("/auth", auth);
api.use("/user", user);
api.use("/party", party);

statics.use(express.static(STATICS_DIR));
statics.get("*", function(req, res) {
  res.sendFile(path.resolve(`${STATICS_DIR}/index.html`));
});

export default { api, statics };
