SELECT * FROM conduces_desayuno a 
inner join articulos_desayuno e on a.articuloid = e.id
where companyid = 6 and escuelaid = 65


select * from articulos_desayuno

UPDATE conduces_desayuno a
SET cantidad = 122,
    total = e.precio * 122
FROM articulos_desayuno e
WHERE a.articuloid = e.id
  AND a.companyid = 6
  AND a.escuelaid = 65;

UPDATE conduces_desayuno a
SET cantidad = 122,
    total    = e.precio * 122,
    itbis    = CASE WHEN e.itbis THEN e.precio * 122 * 0.18 ELSE 0 END
FROM articulos_desayuno e
WHERE a.articuloid = e.id
  AND a.companyid = 6
  AND a.escuelaid = 65;