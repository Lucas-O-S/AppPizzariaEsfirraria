export const UsuarioWrapper = (usuarioModel) => {
    return {
        id: usuarioModel.id,
        name: usuarioModel.name,
        password: usuarioModel.password,
        roleId: usuarioModel.roleId || 2
    };
};
