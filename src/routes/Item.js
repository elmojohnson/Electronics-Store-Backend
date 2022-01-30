const express = require("express");
const router = express.Router();
const authToken = require("../config/authToken");
const Item = require("../models/Item");

// Show items
router.get("/all", async (req, res) => {
  const { category, brand } = req.query;

  // By category
  if (category) {
    const items = await Item.find({ category });
    return res.status(200).json(items);
  }

  // By brand
  if (brand) {
    const items = await Item.find({ brand });
    return res.status(200).json(items);
  }

  // Show all items
  const items = await Item.find();
  res.status(200).json(items);
});

// Show item by id
router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.status(200).json(item);
});

// Add new item
router.post("/new", authToken, (req, res) => {
  const { name, brand, category, price, description, images } = req.body;
  const newItem = new Item({
    name,
    brand,
    category,
    price,
    description,
    images,
  });
  newItem.save((err, result) => {
    if (err) throw err;
    res.status(200).json({error: false, msg: "Item added", result});
  });
});

// Update item
router.put("/:id", authToken, async (req, res) => {
  const { name, brand, category, price, description, images } = req.body;
  const updateItem = await Item.findByIdAndUpdate(req.params.id, {
    name,
    brand,
    category,
    price,
    description,
    images,
  });
  if (updateItem) {
    res.status(200).json({ error: false, msg: "Item updated" });
  } else {
    res
      .status(500)
      .json({ error: true, msg: "There was a problem updating the item" });
  }
});

// Delete item by ID
router.delete("/:id", authToken, async (req, res) => {
  const deleteItem = await Item.findByIdAndDelete(req.params.id);
  if (deleteItem) {
    res.status(200).json({ error: false, msg: "Item deleted", deleteItem });
  } else {
    res
      .status(500)
      .json({ error: true, msg: "There was a problem deleting the item" });
  }
});

module.exports = router;
