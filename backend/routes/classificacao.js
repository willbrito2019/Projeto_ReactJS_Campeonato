const express = require("express");
const router = express.Router();
const Time = require("../models/Time");
const Jogo = require("../models/Jogo");

// Função para calcular a classificação
const calcularClassificacao = async () => {
  const times = await Time.find();
  const jogos = await Jogo.find().populate("timeCasa timeFora");

  let tabela = times.map((time) => ({
    nome: time.nome,
    pontos: 0,
    vitorias: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0,
  }));

  // Percorrer os jogos e atualizar os dados
  jogos.forEach((jogo) => {
    let timeCasa = tabela.find((t) => t.nome === jogo.timeCasa.nome);
    let timeFora = tabela.find((t) => t.nome === jogo.timeFora.nome);

    if (!timeCasa || !timeFora) return;

    timeCasa.golsPro += jogo.golsCasa;
    timeCasa.golsContra += jogo.golsFora;
    timeCasa.saldoGols = timeCasa.golsPro - timeCasa.golsContra;

    timeFora.golsPro += jogo.golsFora;
    timeFora.golsContra += jogo.golsCasa;
    timeFora.saldoGols = timeFora.golsPro - timeFora.golsContra;

    if (jogo.golsCasa > jogo.golsFora) {
      timeCasa.pontos += 3;
      timeCasa.vitorias += 1;
    } else if (jogo.golsCasa < jogo.golsFora) {
      timeFora.pontos += 3;
      timeFora.vitorias += 1;
    } else {
      timeCasa.pontos += 1;
      timeFora.pontos += 1;
    }
  });

  // Ordenar a tabela (Critérios: Pontos > Vitórias > Saldo de Gols > Gols Pró)
  tabela.sort((a, b) => 
    b.pontos - a.pontos || 
    b.vitorias - a.vitorias || 
    b.saldoGols - a.saldoGols || 
    b.golsPro - a.golsPro
  );

  return tabela;
};

// Endpoint para obter a classificação
router.get("/", async (req, res) => {
  try {
    const classificacao = await calcularClassificacao();
    res.json(classificacao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao calcular classificação", error });
  }
});

module.exports = router;
