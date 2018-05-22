import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import * as authDb from "../../data/auth.js";

const router = Router();
const AUTH_FAIL = "Wrong username or password";

passport.use(
  new LocalStrategy(function(username, password, done) {
    authDb
      .getAuth({ id: user.id })
      .then(auth => {
        if (!auth[0]) done(AUTH_FAIL);
        bcrypt.compare(password, auth[0].passwd, function(err, res) {
          if(res) done(null, user);
          else done(AUTH_FAIL);
        });
      })
      .catch(err => done(err));
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);
