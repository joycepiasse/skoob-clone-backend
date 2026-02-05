import "dotenv/config";
import app from "./app";

const PORT = 3000;

console.log("JWT_SECRET carregado?", process.env.JWT_SECRET ? "SIM" : "NÃO");

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
