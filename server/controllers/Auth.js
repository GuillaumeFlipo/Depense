const { Users } = require("./../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id, nom) => {
  return jwt.sign({ nom: nom, id: id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { nom, password } = req.body;

  const user = await Users.findOne({
    where: {
      nom: nom,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(password, 10).then((hash) => {
          Users.create({
            nom: nom,
            password: hash,
          });
          return res.status(201).json({ message: "SUCCESS" });
        });
      } else {
        if (user.nom === nom) {
          res.json({ message: "nom déjà utilisé" });
        }
      }
    })
    .catch((error) => res.status(500).json({ message: "erreur", error }));
};

module.exports.signIn = async (req, res) => {
  const { nom, password } = req.body;
  const user = await Users.findOne({ where: { nom: nom } })
    .then((user) => {
      if (!user) {
        return res.json({ message: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            return res.json({
              message: "Wrong nom and Password Combination",
            });
          } else {
            const token = createToken(user.id, user.nom);
            res.cookie("jwt", token, { httpOnly: true, maxAge });
            res.status(200).json({ message: "You Logged In", user: user.id });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
