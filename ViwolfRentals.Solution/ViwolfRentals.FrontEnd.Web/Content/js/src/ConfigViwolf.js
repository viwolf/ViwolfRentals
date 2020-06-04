var configViwolf = function () {

    const _Roles = {
        Administrador: 1,
        Usuario: 2
    }

    const _EstadosVehiculos = {
        Activo: 1,
        Inactivo: 0
    }

    const _ModosPagos = {
        Efectivo: 1,
        CxC: 2
    }

    return {
        Roles: _Roles,
        EstadosVehiculos: _EstadosVehiculos,
        ModosPagos: _ModosPagos
    }
}();