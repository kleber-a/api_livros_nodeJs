import { autor } from "../models/Autor.js";
// import livro from "../models/Livro.js";
import { livro } from "../models/index.js";

class LivroController {

    static async listarLivros (req, res, next) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros)  
        } catch (error) {
            next(error);

        }
    }

    static async listarLivroPorId (req, res, next) {
        try {
            const id = req.params.id;
            const livroResultado = await livro.findById(id)
            .populate("autor", "nome")
            .exec();
            console.log('aqui')
          if (livroResultado !== null) {
            res.status(200).send(livroResultado);
          } else {
            next(new NaoEncontrado("Id do livro não localizado."));
          }
            // const livroEncontrado = await livro.findById(id);
            // res.status(200).json(livroEncontrado)  
        } catch (error) {
            next(error);

        }
    }

    static async cadastrarLivro (req, res, next) {
        console.log('dentro da função')
        const novoLivro = req.body
        try {

        console.log('dentro da função try')

        let novolivro = new livro(req.body);

        const livroResultado = await novolivro.save();
        console.log('')
        res.status(201).send(livroResultado.toJSON());

        // const autorEncontrado = await autor.findById(novoLivro.autor);
        // const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
        // const livroCriado = await livro.create(livroCompleto)
        // res.status(201).json({message: "Criado com sucesso", livro: livroCriado});

        } catch(error) {
            console.log('dentro da função catch')
            next(error);
        }
    }

    static async atualizarLivro (req, res, next) {
        try {
            const id = req.params.id;
            const livroResultado = await livro.findByIdAndUpdate(id, {$set: req.body});

            if (livroResultado !== null) {
              res.status(200).send({message: "Livro atualizado com sucesso"});
            } else {
              next(new NaoEncontrado("Id do livro não localizado."));
            }
            // await livro.findByIdAndUpdate(id, req.body);
            // res.status(200).json( { message: "livro atualizado" } );  
        } catch (error) {
            next(error);
        }
    }

    static async excluirLivro (req, res, next) {
        try {
            const id = req.params.id;
            const livroResultado = await livros.findByIdAndDelete(id);

            if (livroResultado !== null) {
              res.status(200).send({message: "Livro removido com sucesso"});
            } else {
              next(new NaoEncontrado("Id do livro não localizado."));
            }
            // await livro.findByIdAndDelete(id);
            // res.status(200).json( { message: "livro excluído com sucesso" } );  
        } catch (error) {
            next(error);

        }
    }

    // static async listarLivroPorEditora (req, res, next) {
    //     const editora = req.query.editora;
    //     try {
    //         const livrosPorEditora = await livro.find({ editora: editora });
    //         res.status(200).json(livrosPorEditora);  
    //     } catch (error) {
    //         next(error);

    //     }
    // }

    static async listarLivroPorFiltro (req, res, next) {
        try {
            const { editora, titulo } = req.query;
            //1 forma
            // const regex = new RegExp(titulo, "i");

            const busca = {};

            if(editora) busca.editora = editora;
            //2 forma
            if(titulo) busca.titulo = { $regex: titulo, $options: "i" };
            //1 forma
            // if(titulo) busca.titulo = regex;

            const livrosPorEditora = await livro.find(busca);
            res.status(200).json(livrosPorEditora);  
        } catch (error) {
            next(error);

        }
    }

};

export default LivroController;