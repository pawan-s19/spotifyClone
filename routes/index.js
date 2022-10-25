var express = require("express");
const { Passport } = require("passport/lib");
const users = require("./users");
const album = require("./album");
const chart = require("./chart");
var router = express.Router();
var passport = require("passport");
module.exports = router;
const localStrategy = require("passport-local");
passport.use(new localStrategy(users.authenticate()));
const axios = require("axios");

router.get("/getdets", (req, res, next) => {});

router.get("/", function (req, res, next) {
  res.render("login");
});

router.post("/register", function (req, res) {
  var user = new users({
    name: req.body.name,
    username: req.body.username,
  });
  users
    .register(user, req.body.password)
    .then(function (u) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    })
    .catch(function (err) {
      res.send(err.message);
    });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  }),
  function (req, res) {}
);
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}
router.get("/logout", isLoggedIn, function (req, res) {
  req.logOut;
  res.redirect("/");
});
router.get("/signuppage", function (req, res) {
  res.render("signup");
});
router.get("/home", isLoggedIn, function (req, res) {
  album.find({}).then(function (album) {
    chart.find({}).then(function (chart) {
      res.render("home", { album, user: req.session.passport.user, chart });
    });
  });
});
router.get("/datadedo", isLoggedIn, function (req, res) {
  album.find({}).then(function (album) {
    chart.find({}).then(function (chart) {
      res.json({ album, chart });
    });
  });
});
router.get("/createAlbum", function (req, res) {
  res.render("createAlbum");
});
router.get("/createchart", function (req, res) {
  res.render("createchart");
});
router.post("/album", isLoggedIn, function (req, res) {
  users.findOne({ username: req.session.passport.user }).then(function (user) {
    album
      .create({
        image: req.body.image,
        name: req.body.name,
        songs: req.body.song,
        username: user.username,
      })
      .then(function (createdAlbum) {
        res.redirect(req.headers.referer);
      });
  });
});
router.post("/chart", isLoggedIn, function (req, res) {
  users.findOne({ username: req.session.passport.user }).then(function (user) {
    chart
      .create({
        image: req.body.image,
        name: req.body.name,
        songs: req.body.song,
        username: user.username,
      })
      .then(function (createdchart) {
        res.redirect(req.headers.referer);
      });
  });
});

router.get("/songpusher/:plc", function (req, res) {
  album.findOne({ _id: req.params.plc }).then(function (album) {
    album.songs.push(req.query.song);
    album.save();
    res.send(album);
  });
});
router.get("/push", function (req, res) {
  res.render("push");
});
router.get("/home/:plc", isLoggedIn, function (req, res) {
  album.findOne({ _id: req.params.plc }).then(function (album) {
    res.json(album);
  });
});
router.get("/album/:plc", isLoggedIn, function (req, res) {
  album.find({}).then(function (album) {
    chart.find({}).then(function (chart) {
      res.render("songs", { album, user: req.session.passport.user, chart });
    });
  });
});
