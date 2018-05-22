import express, { Router } from "express";
import party from "./party";
import user from "./user";

const api = new Router();
api.use("/user", user);
api.use("/party", party);

const statics = express.static('statics');

export default { api, statics };
