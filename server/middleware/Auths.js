const jwt = require("jsonwebtoken");
const { Users } = require("./../models");

module.exports.requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // const user = await Users.findByPk(decodedToken.id, {
    //   attributes: { exclude: ["password"] },
    // });
    if (req.body.userId && req.body.userId !== decodedToken.id) {
      throw "Invalid user ID";
      // } else if(user.superUtilisateur) {
    } else if (req.params.bool === "true") {
      const user = await Users.findByPk(decodedToken.id, {
        attributes: { exclude: ["password"] },
      });
      if (user.superUtilisateur === "true") {
        next();
      } else {
        res.status(201).json("not allowed");
      }
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Need authorization",
    });
  }
};

module.exports.checkUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await Users.findByPk(decodedToken.id, {
      attributes: { exclude: ["password"] },
    });
    res.locals.user = user;
    next();
  } catch {
    res.locals.user = null;

    next();
  }
};
