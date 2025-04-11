const mongoose = require("mongoose");

const JogoSchema = new mongoose.Schema({
  timeCasa: { type: mongoose.Schema.Types.ObjectId, ref: "Time", required: true },
  timeFora: { type: mongoose.Schema.Types.ObjectId, ref: "Time", required: true },
  golsCasa: { type: Number, required: true },
  golsFora: { type: Number, required: true },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Jogo", JogoSchema);
