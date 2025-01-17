import express from "express";
import connectDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const app = express();

async function startServer() {
  try {
    const conexao = await connectDataBase();
    conexao.on("error", (erro) => console.error("erro de conexão", erro));
    conexao.once("open", () => {
      console.log("conexão com o banco feita com sucesso");
    });

    // Rotas do Express
    routes(app);

    // Inicia o servidor após garantir que o banco está conectado
    app.listen(process.env.PORT || 3000, () => {
      console.log("Servidor rodando...");
    });
  } catch (err) {
    console.error("Erro ao conectar com o banco ou iniciar o servidor", err);
  }
}

startServer();

export default app;
