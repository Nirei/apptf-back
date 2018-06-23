export function requireAuth(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.end();
  }
}
