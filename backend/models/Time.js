const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  escudo: { type: String, required: false }, // URL da imagem do time
  vitorias: { type: Number, default: 0 },
  empates: { type: Number, default: 0 },
  derrotas: { type: Number, default: 0 },
  golsPro: { type: Number, default: 0 },
  golsContra: { type: Number, default: 0 },
});

module.exports = mongoose.model("Time", TimeSchema);
