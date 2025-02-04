import express from "express";
import connectDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
// import mongoose from "mongoose";
import manipuladorDeErros from "./middlewares/manipuladoDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await connectDataBase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro)
});

conexao.once("open", () => {
    console.log('conexão com o banco feita com sucesso')
});

const app = express();
routes(app);

app.use(manipulador404)
app.use(manipuladorDeErros);

export default app;
