const router = require("express").Router();
const passport = require("passport");
const Container = require("../services/userServices");
const service = new Container();

router.get("/login", (req, res) => {
  res.redirect("login.html");
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/serveFailure" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.post(
  "/singup",
  passport.authenticate("register", {
    failureRedirect: "/serveFailure",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/serveFailure", (req, res) => {
  res.redirect("failureLogin.html");
});

module.exports = router;
