const express = require("express");
const router = express.Router();
const Jogo = require("../models/Jogo");
const Time = require("../models/Time");

// Criar jogo e atualizar classificação
router.post("/", async (req, res) => {
  try {
    const { timeCasa, timeFora, golsCasa, golsFora } = req.body;
    const novoJogo = new Jogo({ timeCasa, timeFora, golsCasa, golsFora });
    await novoJogo.save();

    // Atualizar estatísticas dos times
    const time1 = await Time.findById(timeCasa);
    const time2 = await Time.findById(timeFora);

    time1.golsPro += golsCasa;
    time1.golsContra += golsFora;
    time2.golsPro += golsFora;
    time2.golsContra += golsCasa;

    if (golsCasa > golsFora) {
      time1.vitorias++;
      time2.derrotas++;
    } else if (golsCasa < golsFora) {
      time2.vitorias++;
      time1.derrotas++;
    } else {
      time1.empates++;
      time2.empates++;
    }

    await time1.save();
    await time2.save();

    res.status(201).json(novoJogo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const jogos = await Jogo.find().populate("timeCasa timeFora");
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar jogos", error });
  }
});

// Excluir um jogo
router.delete("/:id", async (req, res) => {
  try {
    await Jogo.findByIdAndDelete(req.params.id);
    res.json({ message: "Jogo removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir jogo", error });
  }
});

module.exports = router;
