const router = require("express").Router();

const actions = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  actions
    .get()
    .then(listOfActions => {
      res.status(200).json(listOfActions);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  actions
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  actions
    .insert(body)
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  actions
    .update(id, body)
    .then(modifiedAction => {
      res.status(200).json(modifiedAction);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(id)
    .then(removed => {
      res.status(200).json(removed);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});
module.exports = router;
