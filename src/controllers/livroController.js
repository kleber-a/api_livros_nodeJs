import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros)  
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição` })

        }
    }

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado)  
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição do livro` })

        }
    }

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
            const livroCriado = await livro.create(livroCompleto)
            // const novoLivro = await livro.create(req.body)
            res.status(201).json({message: "Criado com sucesso", livro: livroCriado});
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar livro` })
        }
    }

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json( { message: "livro atualizado" } );  
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na atualização` })

        }
    }

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json( { message: "livro excluído com sucesso" } );  
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na exclusão` })

        }
    }

    static async listarLivroPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);  
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na busca` })

        }
    }

};

export default LivroController;