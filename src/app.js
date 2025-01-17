import express from "express";
import connectDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await connectDataBase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro)
});

conexao.once("open", () => {
    console.log('conexão com o banco feita com sucesso')
});

const app = express();
routes(app);


app.delete("/livros/:id", (req, res) => {
    const index = buscarLivros(req.params.id);
    livros.splice(index, 1);
    res.status(200).send('livro removido com sucesso');
});

export default app;
