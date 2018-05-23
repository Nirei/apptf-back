import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import * as authDb from "../../data/auth.js";
import * as userDb from "../../data/user.js";

const router = Router();
const AUTH_FAIL = "Wrong username or password";

function logout(req, res) {
  req.logout();
  res.redirect("/");
}

function changePassword(req, res) {
  const id = req.params.id;

}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userDb
    .getUser({ id })
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    authDb
      .getAuth({ id: user.id })
      .then(auth => {
        if (!auth[0]) done(AUTH_FAIL);
        bcrypt.compare(password, auth[0].passwd, function(err, res) {
          if (res) done(null, user);
          else done(AUTH_FAIL);
        });
      })
      .catch(err => done(err));
  })
);

router.put("/password/:id", changePassword);
router.get("/logout", logout);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

export default router;
