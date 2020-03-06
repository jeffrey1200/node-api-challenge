const router = require("express").Router();

const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  projects
    .get()
    .then(projs => {
      res.status(200).json(projs);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(projById => {
      res.status(200).json(projById);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.get("/:id/actions", (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  projects
    .insert(body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  projects
    .update(id, body)
    .then(modifiedProject => {
      res.status(201).json(modifiedProject);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .remove(id)
    .then(removedProject => {
      res.status(200).json(removedProject);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});
module.exports = router;
