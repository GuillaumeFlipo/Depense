const { DepensesEvent } = require("../models");

module.exports.readItems = async (req, res) => {
  const listOfItems = await DepensesEvent.findAll();

  res.status(200).json(listOfItems);
};

module.exports.readItem = async (req, res) => {
  const listOfItem = await DepensesEvent.findAll({
    where: { UserId: req.params.id },
  });

  res.status(200).json(listOfItem);
};

module.exports.createItem = async (req, res) => {
  const item = req.body;
  await DepensesEvent.create(item)
    .then(() => {
      res.json(item);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

module.exports.updateItem = async (req, res) => {
  const item = await DepensesEvent.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  })
    .then((item) => {
      if (item === null) {
        return res.status(400).send("ID unknown : " + req.params.id);
      } else {
        item
          .update({
            nom: req.body.nom,
            comment: req.body.comment,
            dateFin: req.body.dateFin,
            dateDebut: req.body.dateDebut,
            month: req.body.month,
            year: req.body.year,
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

module.exports.deleteItem = async (req, res) => {
  const item = await DepensesEvent.destroy({
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
