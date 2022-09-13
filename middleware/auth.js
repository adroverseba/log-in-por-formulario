const Container = require("../services/userServices");
const service = new Container();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// const login = (req, res, next) => {
//   if (req.session.user?.email) {
//     next();
//   } else {
//     res.redirect("login.html");
//     // res.redirect("public/");
//     // res.send("hola mundo");
//   }
// };
passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async function (req, username, password, next) {
      let user = await service.getOne(username);

      if (user && user.email === username && user.password === password) {
        // console.log("aca estoy");
        return next(null, user);
      } else {
        return next(null, false);
      }
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async function (req, username, password, next) {
      // let usuario = await service.getOne(username);
      // if (usuario) return next(null, false);

      const { name, email } = req.body;
      console.log(name);
      let user = await service.save({ name, email, password });
      return next(null, user);
    }
  )
);

passport.serializeUser(function (user, next) {
  next(null, user.email);
});

passport.deserializeUser(async function (username, next) {
  console.log(username);
  let usuario = await service.getOne(username);
  next(null, usuario);
});
// module.exports = { login };
