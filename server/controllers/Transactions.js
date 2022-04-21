const { Transactions } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

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

// module.exports.readOneTransaction = async (req, res) => {
//   const id = req.params.id;
//   const transaction = await Transactions.findByPk(id);
//   res.status(200).json(transaction);
// };

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

module.exports.uploadPicture = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 1000000) throw Error("max size");
  } catch (err) {
    return res.status(201).json(err);
  }

  const fileName =
    req.body.order + "_" + req.body.where + "TransactionImage.jpg";
  console.log("test");

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../client/public/uploads/TransactionImage/${fileName}`
    )
  );
  // return res.send("Successfully uploaded");

  try {
    const transaction = await Transactions.findByPk(req.body.id)
      .then((transaction) => {
        if (transaction === null) {
          return res.status(400).send("ID unknown : " + req.body.id);
        } else {
          transaction
            .update({
              text: "../../uploads/TransactionImage/" + fileName,
              type: req.body.type,
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
  } catch (err) {
    return res.status(500).send({ message: req.body.id });
  }
};

module.exports.uploadPictureAdd = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpeg"
    )
      throw Error("invalid file");
    if (req.file.size > 1000000) throw Error("max size");
  } catch (err) {
    return res.status(201).json(err);
  }

  const fileName =
    req.body.order + "_" + req.body.where + "TransactionImage.jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../client/public/uploads/TransactionImage/${fileName}`
    )
  );
  // return res.send("Successfully uploaded");

  try {
    const transaction = req.body;
    transaction.text = "../../uploads/TransactionImage/" + fileName;
    await Transactions.create(transaction)
      .then(() => {
        res.json(transaction);
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } catch (err) {
    return res.status(500).send({ message: req.body.id });
  }
};

module.exports.uploadPdf = async (req, res) => {
  try {
    if (req.file.detectedMimeType !== "application/pdf")
      throw console.log("mauvois fichier", req.file.detectedMimeType);
    if (req.file.size > 1000000) throw Error("max size");
  } catch (err) {
    return res.status(201).json(err);
  }

  const fileName = req.body.order + "_" + req.body.where + "TransactionPdf.pdf";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../client/public/uploads/TransactionPdf/${fileName}`
    )
  );
  // return res.send("Successfully uploaded");

  try {
    const transaction = await Transactions.findByPk(req.body.id)
      .then((transaction) => {
        if (transaction === null) {
          return res.status(400).send("ID unknown : " + req.body.id);
        } else {
          transaction
            .update({
              path: "../../uploads/TransactionPdf/" + fileName,
              text: req.body.text,
              type: req.body.type,
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
  } catch (err) {
    return res.status(500).send({ message: req.body.id });
  }
};

module.exports.uploadPdfAdd = async (req, res) => {
  try {
    if (req.file.detectedMimeType !== "application/pdf")
      throw Error("invalid file");
    if (req.file.size > 1000000) throw Error("max size");
  } catch (err) {
    return res.status(201).json(err);
  }

  const fileName =
    req.body.order + "_" + req.body.ArticleId + "TransactionPdf.pdf";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../client/public/uploads/TransactionPdf/${fileName}`
    )
  );
  // return res.send("Successfully uploaded");

  try {
    const transaction = req.body;
    transaction.path = "../../uploads/TransactionPdf/" + fileName;
    await Transactions.create(transaction)
      .then(() => {
        res.json(transaction);
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } catch (err) {
    return res.status(500).send({ message: req.body.id });
  }
};
