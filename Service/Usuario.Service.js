import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { multipartHeader } from "../utils/HeaderHelper";
import AlunoModel from "../Models/AlunoModel"
import ImageHelper from "../utils/ImageHelper";

export class UsuarioService {
    


    static async update(alunoWrapper, id) {
        console.log("entrou em update")
    
        const headers = {
            ...multipartHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url:"/aluno/"+id,
            method:"PUT",
            body:alunoWrapper,
            headers:headers 
        });

        console.log(JSON.stringify(result))
        
        const resultBody = result.data;
        if(result.status != "200"){
            throw new Error(resultBody.message);
            
        }

        return result;
    }

    static async create(alunoWrapper){
        console.log("entrou em create")
    
        const headers = {
            ...multipartHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url:"/aluno",
            method:"POST",
            body:alunoWrapper,
            headers:headers 
        });
        
        const resultBody = result.data; 
        if(result.status != "201"){
            throw new Error(resultBody.message);
            
        }

        return result;

    }

    static async findAll(){
        console.log("Entrou em find All");

        const result = await ExecuteHttpRequest.callout({
            url:"/aluno",
            method:"GET",
        });

        console.log(JSON.stringify(result));

        let alunosList = []

        result.data.data.forEach((dataUnit) => {
            alunosList.push(new AlunoModel({
                id : dataUnit.id,
                nome: dataUnit.nome,
                ra : dataUnit.ra
            }))
        });

        console.log(alunosList);

        if(result.status != "200"){
            throw new Error(result.data.message);
            
        }

        return alunosList;
            

    }

    static async findOne(id){
        console.log("Entrou em find one");

        const result = await ExecuteHttpRequest.callout({
            url:"/aluno/"+id,
            method:"GET",
    });

        console.log(JSON.stringify(result));

        if(result.status != "200"){
            throw new Error(result.data.message);
            
        }
        const dataUnit = result.data.dataUnit;
        
        return new AlunoModel({
            id : dataUnit.id,
            nome : dataUnit.nome,
            ra : dataUnit.ra,
            imagem64 : ImageHelper.convertByteToBase64(dataUnit.imagem),
        });
    }
    static async delete(id){
        console.log("Entrou em delete");

        const result = await ExecuteHttpRequest.callout({
            url:"/aluno/"+id,
            method:"DELETE",
        });

        console.log(JSON.stringify(result));

        if(result.status != "200"){
            throw new Error(result.data.message);
            
        }
    }

} 