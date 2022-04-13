const { Categories } = require("../models");

module.exports.readCategories = async (req, res) => {
  const listOfCategories = await Categories.findAll();

  res.status(200).json(listOfCategories);
};

module.exports.readOneTransaction = async (req, res) => {
  const id = req.params.id;
  const transaction = await Categories.findByPk(id);
  res.status(200).json(transaction);
};

module.exports.createTransaction = async (req, res) => {
  const transaction = req.body;
  await Categories.create(transaction)
    .then(() => {
      res.json(transaction);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

module.exports.updateTransaction = async (req, res) => {
  const transaction = await Categories.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  })
    .then((transaction) => {
      if (transaction === null) {
        return res.status(400).send("ID unknown : " + req.params.id);
      } else {
        transaction
          .update({
            nom: req.body.nom,
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

module.exports.deleteTransaction = async (req, res) => {
  const transaction = await Categories.destroy({
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
