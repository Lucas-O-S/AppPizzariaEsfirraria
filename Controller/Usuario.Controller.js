import { AlunoService } from "../Service/Aluno.Service";
import { UsuarioWrapper } from "../Wrappers/UsuarioWrapper";


export default class UsuarioController {

    

    static async saveAluno(alunoModel){
        try{
            console.log("nome do aluno: " + alunoModel.nome)

            const request = UsuarioWrapper(alunoModel);

            console.log(request);
            
            if(alunoModel.id){
                await AlunoService.update(request, alunoModel.id);
            }        
            else{
                await AlunoService.create(request);
            }


        }
        catch(Error){
            console.log("Erro ao salvar aluno:", Error.message);
            throw new Error(Error.message);
             
        }

    }

    static async findAll(){
        try{
            return await AlunoService.findAll();
        }
        catch(Erro)
        {
            console.log("Erro ao buscar alunos:", Error.message);
            throw new Error(Error.message);
        }
    }

    static async findOne(id){
        try{
            return await AlunoService.findOne(id);
        }
        catch(Erro)
        {
            console.log("Erro ao buscar alunos:", Error.message);
            throw new Error(Error.message);
        }
    }

    static async delete(id){
        try{
            await AlunoService.delete(id);
        }
        catch(Erro)
        {
            console.log("Erro ao deletar alunos:", Error.message);
            throw new Error(Error.message);
        }
    }

    


}