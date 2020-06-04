var configViwolf = function () {

    const _Roles = {
        Administrador: 1,
        Usuario: 2
    }

    const _EstadosVehiculos = {
        Activo: 1,
        Inactivo: 0
    }

    return {
        Roles: _Roles,
        EstadosVehiculos: _EstadosVehiculos
    }
}();