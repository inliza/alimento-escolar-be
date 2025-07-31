"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerysEnum = void 0;
var QuerysEnum;
(function (QuerysEnum) {
    QuerysEnum["GetProfesionalData"] = "SELECT \n    a.id as ProfesionalId, a.nombres, a.apellidos, a.documento, \n    a.idProfesion,b.nombreProfesion, c.id, c.correo\n    FROM \n    public.profesionales as a inner join\n    public.tipoprofesiones as b on a.idprofesion = b.id inner join\n    public.usuarios c on a.idusuario = c.id\n    WHERE a.id = ";
})(QuerysEnum || (exports.QuerysEnum = QuerysEnum = {}));
//# sourceMappingURL=queries.enum.js.map