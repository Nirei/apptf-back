import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import * as authDb from "../../data/auth.js";
import * as userDb from "../../data/user.js";

const router = Router();

function logout(req, res) {
  console.log("logout");
  req.logout();
  res.redirect("/");
}

function changePassword(req, res) {
  const id = req.params.id;
}

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log(id);
  userDb
    .getUser({ id })
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use(
  new LocalStrategy(function(user, password, done) {
    console.log("entering Local Strategy");
    authDb
      .getAuth({ id: user.id })
      .then(auth => {
        console.log(auth);
        if (!auth[0]) {
          console.log(auth);
          console.log(user.id);
          done(null, null);
        } else {
          bcrypt.compare(password, auth[0].passwd, function(err, res) {
            if (res) {
              done(null, user);
            } else {
              done(null, false);
            }
          });
        }
      })
      .catch(err => done(err));
  })
);

router.put("/password/:id", changePassword);
router.get("/logout", logout);
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err); // 500 error
    }
    if (!user) {
      res.status(401);
      return res.end();
    }
    // We've got an user, attempt login
    req.logIn(user, function(err) {
      if (err) {
        return next(err); // 500 error
      }
      // Generate a JSON response reflecting signup
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

export default router;
