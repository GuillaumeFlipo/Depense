const { Users } = require("./../models");
const { Followers } = require("./../models");
const { Op } = require("sequelize");

module.exports.getAllUsers = async (req, res) => {
  const users = await Users.findAll({ attributes: { exclude: ["password"] } });
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  const user = await Users.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  })
    .then((user) => {
      if (user === null) {
        return res.status(400).send("ID unknown : " + req.params.id);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.updateUser = async (req, res) => {
  const user = await Users.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  })
    .then((user) => {
      if (user === null) {
        return res.status(400).send("ID unknown : " + req.params.id);
      } else {
        user
          .update({
            bio: req.body.bio,
          })
          .then((docs) => {
            res.send(docs);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.deleteUser = async (req, res) => {
  const user = await Users.destroy({
    where: {
      id: req.params.id,
    },
    force: true,
  })
    .then((bol) => {
      if (bol) {
        res.status(200).json({ message: "Successfully deleted" });
      } else {
        return res.status(400).send("ID unknown : " + req.params.id);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
