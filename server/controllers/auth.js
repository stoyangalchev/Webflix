const { userModel, tokenBlacklistModel, movieModel } = require("../models");

const utils = require("../utils");
const { authCookieName } = require("../app-config");
const { modelNames } = require("mongoose");

const bsonToJson = (data) => {
  return JSON.parse(JSON.stringify(data));
};
const removePassword = (data) => {
  const { password, __v, ...userData } = data;
  return userData;
};

function register(req, res, next) {
  const { age, email, username, password, imageUrl } = req.body;
  return userModel
    .create({ age, email, username, password, imageUrl })
    .then((createdUser) => {
      createdUser = bsonToJson(createdUser);
      createdUser = removePassword(createdUser);

      const token = utils.jwt.createToken({ id: createdUser._id });
      if (process.env.NODE_ENV === "production") {
        res.cookie(authCookieName, token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
      } else {
        res.cookie(authCookieName, token, { httpOnly: true });
      }
      res.status(200).send(createdUser);
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        let field = err.message.split("index: ")[1];
        field = field.split(" dup key")[0];
        field = field.substring(0, field.lastIndexOf("_"));

        res
          .status(409)
          .send({ message: `This ${field} is already registered!` });
        return;
      }
      next(err);
    });
}

function login(req, res, next) {
  const { username, password } = req.body;
  userModel
    .findOne({ username })
    .then((user) => {
      return Promise.all([user, user ? user.matchPassword(password) : false]);
    })
    .then(([user, match]) => {
      if (!match) {
        res.status(401).send({ message: "Wrong username or password" });
        return;
      }
      user = bsonToJson(user);
      user = removePassword(user);

      const token = utils.jwt.createToken({ id: user._id });

      if (process.env.NODE_ENV === "production") {
        res.cookie(authCookieName, token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
      } else {
        res.cookie(authCookieName, token, { httpOnly: true });
      }
      res.status(200).send(user);
    })
    .catch(next);
}

// function logout(req, res) {
//   const token = req.cookies[authCookieName];

//   tokenBlacklistModel
//     .create({ token })
//     .then(() => {
//       res
//         .clearCookie(authCookieName)
//         .status(204)
//         .send({ message: "Logged out!" });
//     })
//     .catch((err) => res.send(err));
// }
function logout(req, res) {
  res.clearCookie(authCookieName).status(204).send({ message: "Logged out!" });
}

function getProfileInfo(req, res, next) {
  const { _id: userId } = req.user;


  userModel
    .findOne({ _id: userId }, { password: 0, __v: 0 })
    .populate("movies")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
}

function editProfileInfo(req, res, next) {
  const { _id: userId } = req.user;
  const { imageUrl } = req.body;

  userModel
    .findOneAndUpdate(
      { _id: userId },
      { $set: { imageUrl: imageUrl } },
      { runValidators: true, new: true }
    )
    .then((x) => {
      res.status(200).json(x);
    })
    .catch(next);
}

function search(req, res, next) {
  const query = req.params.query;
  if (typeof query !== "string") {
    return res.status(400).json({ error: "Invalid query parameter" });
  }
  movieModel
    .find({ title: { $regex: query, $options: "i" } })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    });
}

module.exports = {
  login,
  register,
  logout,
  getProfileInfo,
  editProfileInfo,
  search,
};
