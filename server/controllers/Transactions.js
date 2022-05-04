const { Transactions } = require("../models");

module.exports.readTransaction = async (req, res) => {
  const listOfTransactions = await Transactions.findAll();

  res.status(200).json(listOfTransactions);
};

module.exports.readTransactionsId = async (req, res) => {
  const listOfTransactions = await Transactions.findAll({
    where: { UserId: req.params.id },
  });

  res.status(200).json(listOfTransactions);
};

module.exports.readTransactionsEvent = async (req, res) => {
  const listOfTransactions = await Transactions.findAll({
    where: { DepensesEventId: req.params.id },
  });

  res.status(200).json(listOfTransactions);
};

module.exports.createTransaction = async (req, res) => {
  const transaction = req.body;
  await Transactions.create(transaction)
    .then(() => {
      res.json(transaction);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

module.exports.updateTransaction = async (req, res) => {
  const transaction = await Transactions.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  })
    .then((transaction) => {
      if (transaction === null) {
        return res.status(400).send("ID unknown : " + req.params.id);
      } else {
        transaction
          .update({
            nom: req.body.nom,
            somme: req.body.somme,
            comment: req.body.comment,
            date: req.body.date,
            dateString: req.body.dateString,
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
  const transaction = await Transactions.destroy({
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
