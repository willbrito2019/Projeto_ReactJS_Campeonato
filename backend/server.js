require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/times", require("./routes/times"));
app.use("/jogos", require("./routes/jogos"));
app.use("/classificacao", require("./routes/classificacao"));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error("Erro ao conectar ao MongoDB", err));

// Rotas básicas
app.get("/", (req, res) => {
  res.send("API do Campeonato funcionando!");
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
