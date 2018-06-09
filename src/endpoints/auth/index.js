import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import * as authDb from "../../data/auth.js";
import * as userDb from "../../data/user.js";

const router = Router();

function login(req, res, next) {
  return passport.authenticate("local", function(err, user, info) {
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
      return res.json({ user });
    });
  })(req, res, next);
}

function session(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401);
    return res.end();
  }
}

function logout(req, res, next) {
  req.logout();
  return res.status(204).send({});
}

function register(req, res, next) {
  const id = req.params.id;
  Promise.all([userDb.getUser({ id }), authDb.getAuth({ id })])
    .then(([[user], [auth]]) => {
      if (auth) {
        // User is already registered
        res.status(409); // 409 Conflict
        return res.end();
      }
      if (!user) {
        // User id doesn't exist
        res.status(403); // 403 Forbidden
        return res.end();
      }
      // I call it plainText but should come hashed from client anyway.
      const plainText = req.body.password;
      if (typeof plainText !== "string") {
        res.status(400);
        return res.end();
      }

      bcrypt.hash(plainText, 10, function(err, password) {
        authDb
          .createAuth({ id, password })
          .then(() => login({ req, res, next }, user))
          .catch(err => next(err));
      });
    })
    .catch(err => next(err));
}

function changePassword(req, res) {
  const id = req.params.id;
}

import util from "util";
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userDb
    .getUser({ id })
    .then(([user]) => done(null, user))
    .catch(err => done(err));
});

passport.use(
  new LocalStrategy(function(name, password, done) {
    const failMessage = { message: "Incorrect username or password." };
    userDb
      .getUser({ name })
      .then(([user]) => {
        if (!user) {
          return done(null, false, failMessage);
        }
        authDb.getAuth({ id: user.id }).then(([auth]) => {
          if (!auth) {
            done(null, false, failMessage);
          } else {
            bcrypt.compare(password, auth.password, function(err, res) {
              if (res) {
                done(null, user);
              } else {
                done(null, false, failMessage);
              }
            });
          }
        });
      })
      .catch(err => done(err));
  })
);

router.put("/password/:id", changePassword);
router.get("/logout", logout);
router.post("/register/:id", register);
router.get("/session", session);
router.post("/login", login);

export default router;
