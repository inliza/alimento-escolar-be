export enum QuerysEnum {
    GetProfesionalData = `SELECT 
    a.id as ProfesionalId, a.nombres, a.apellidos, a.documento, 
    a.idProfesion,b.nombreProfesion, c.id, c.correo
    FROM 
    public.profesionales as a inner join
    public.tipoprofesiones as b on a.idprofesion = b.id inner join
    public.usuarios c on a.idusuario = c.id
    WHERE a.id = `
}