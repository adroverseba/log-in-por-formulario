const login = (req, res, next) => {
  if (req.session?.email) {
    next();
  } else {
    res.redirect("login.html");
    // res.redirect("public/");
    // res.send("hola mundo");
  }
};

module.exports = { login };
