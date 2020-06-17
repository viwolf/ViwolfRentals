var configViwolf = function () {

    const _Roles = {
        Administrador: 1,
        Usuario: 2
    }

    const _EstadosVehiculos = {
        Activo: 1,
        Inactivo: 0
    }

    const _EstadosContratos = {
        Pendiente: 1,
        Facturado: 2,
        Extendido: 3,
        Anulado: 4,
        Terminado: 5
    }

    const _ModosPagos = {
        Efectivo: 1,
        CxC: 2
    }

    const _CodigosContratos = {
        Fisico: 1,
        Sistema: 2
    }

    return {
        Roles: _Roles,
        EstadosVehiculos: _EstadosVehiculos,
        EstadosContratos: _EstadosContratos,
        ModosPagos: _ModosPagos,
        CodigosContratos: _CodigosContratos

    }
}();