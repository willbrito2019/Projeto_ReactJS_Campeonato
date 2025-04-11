const express = require("express");
const router = express.Router();
const Time = require("../models/Time");

// Criar time
router.post("/", async (req, res) => {
  try {
    const novoTime = new Time(req.body);
    await novoTime.save();
    res.status(201).json(novoTime);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar times
router.get("/", async (req, res) => {
  const times = await Time.find();
  res.json(times);
});

// Atualizar nome e escudo do time
router.put("/:id", async (req, res) => {
  try {
    const { nome, escudo } = req.body;
    const time = await Time.findByIdAndUpdate(
      req.params.id,
      { nome, escudo },
      { new: true }
    );
    res.json(time);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar time", error });
  }
})

module.exports = router;
