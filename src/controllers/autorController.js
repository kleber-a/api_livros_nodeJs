// import mongoose from "mongoose";
import NaoEncontrado from "../erros/NaoEncontrado.js";
// import { autor } from "../models/Autor.js";
import { autor } from "../models/index.js";

class AutorController {

    static async listarAutores (req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores)  
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição` })

        }
    }

    static async listarAutorPorId (req, res, next) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);

            if(autorEncontrado !== null) {
                res.status(200).json(autorEncontrado)  
            } else {
                next(new NaoEncontrado("Id do autor não localizado."))
            }
            
        } catch (error) {
           next(error);
        }
    }

    static async cadastrarAutor (req, res, next) {
        try {
            const novoAutor = await autor.create(req.body)
            res.status(201).json({message: "Criado com sucesso", livro: novoAutor})
        } catch(error) {
            next(error);
        }
    }

    static async atualizarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findByIdAndUpdate(id, {$set: req.body});
            if (autorResultado !== null) {
                res.status(200).send({message: "Autor atualizado com sucesso"});
            } else {
                next(new NaoEncontrado("Id do Autor não localizado."));
            }  
            // await autor.findByIdAndUpdate(id, req.body);
            // res.status(200).json( { message: "livro atualizado" } );
      
        } catch (error) {
            next(error);

        }
    }

    static async excluirAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findByIdAndDelete(id);
            if (autorResultado !== null) {
                res.status(200).send({message: "Autor removido com sucesso"});
              } else {
                next(new NaoEncontrado("Id do Autor não localizado."));
              }
            // await autor.findByIdAndDelete(id);
            // res.status(200).json( { message: "livro excluído com sucesso" } );  
        } catch (error) {
            next(error);

        }
    }

};

export default AutorController;