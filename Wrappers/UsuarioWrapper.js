export const UsuarioWrapper = (usuarioModel) => {
    const formData = new FormData();

    formData.append("nome", usuarioModel.nome);

    formData.append("ra", usuarioModel.ra);


    formData.append("imagem", usuarioModel.imagemFile);    
    

    return formData;
};