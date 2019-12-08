const router = require("express").Router();
const dbModel = require("./questionsModel");
const questionsScrubber = require("./questionsScrubber");

router.get("/", (req, res) => {
  return dbModel
    .findAll()
    .then(p => {
      res.status(200).json({ message: `SUCCESS`, questions: [...p] });
    })
    .catch(e => {
      res.status(404).json({ message: "SOMEMESSAGE", ...e });
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  return dbModel
    .findById(id)
    .then(p => {
      res.status(200).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(404).json({ message: "SOMEMESSAGE", ...e });
    });
});

router.post("/", questionsScrubber, (req, res) => {
  const { body } = req;
  return dbModel
    .add(body)
    .then(p => {
      res.status(201).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(404).json({ message: "SOMEMESSAGE", ...e });
    });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  return dbModel
    .editById(id)
    .then(p => {
      res.status(200).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(404).json({ message: "SOMEMESSAGE", ...e });
    });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  return dbModel
    .remove(id)
    .then(p => {
      res.status(201).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(404).json({ message: "SOMEMESSAGE", ...e });
    });
});

router.routes = [
  { route: "/questions", method: "GET", expects: {}, returns: {} },
  { route: "/questions/:id", method: "GET", expects: {}, returns: {} },
  { route: "/questions", method: "POST", expects: {}, returns: {} },
  { route: "/questions", method: "PUT", expects: {}, returns: {} },
  { route: "/questions/:id", method: "DELETE", expects: {}, returns: {} }
];
module.exports = router;
