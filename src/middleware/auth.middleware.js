export function onlyAdmin(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Unauthorized access. Access only for admin");
  }
}

export function onlyUser(req, res, next) {
  if (req.user.role === "user") {
    next();
  } else {
    res.status(403).send("Unauthorized access. Access only for users");
  }
}
