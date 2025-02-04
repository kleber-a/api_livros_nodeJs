import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro){
        const messageError = Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; ")
        super(`Os seguinte erros foram encontrados: ${messageError}`);
    }
}

export default ErroValidacao;