const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: [{ model: Product }],
  });
  res.send(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;
  const tag = await Tag.findByPk(tagId, {
    include: [{ model: Product }],
  });
  res.send(tag);
});

router.post("/", async (req, res) => {
  // create a new tag
  const tag = await Tag.create(req.body);
  res.send(tag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const tagId = req.params.id;
  const [count, data] = await Tag.update(req.body, {
    where: { id: tagId },
  });
  if (count > 0) {
    res.send("Tag updated successfully!");
  } else {
    res.send("Nothing to be updated!");
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;
  const tag = await Tag.destroy({
    where: {
      id: tagId,
    },
  });
  if (tag > 0) {
    res.send("Tag deleted successfully!");
  } else {
    res.send("Nothing to  deleted!");
  }
});

module.exports = router;
