const db = require('../src/db');
class Hospital{
    constructor(nombreHospital, direccionHospital, telefonoHospital){
        this.nombreHospital = nombreHospital;
        this.direccionHospital = direccionHospital;
        this.telefonoHospital = telefonoHospital;
    }

    async guardar(){
        const query = `
        INSERT INTO citas.hospital 
        (
        nombreHospital,
        direccionHospital,
        telefonoHospital
        )

        VALUES
        (
        '${this.nombreHospital}',
        '${this.direccionHospital}',
        '${this.telefonoHospital}'
        );
    `;
    return await db.ejecutar(query); 
    }

    static async listar(){
        const query = `SELECT nombreHospital, direccionHospital FROM hospital;`
        const respuesta = await db.listar(query, true);

        return respuesta; //asi se llama todos los usuarios
        //return await db.listar(query) asi se llama un usuario el 1
    }
}

module.exports = Hospital;

/*
CREATE TABLE `citas`.`hospital` (
  `idhospital` INT(11) NOT NULL,
  `nombreHospital` VARCHAR(45) NOT NULL,
  `direccionHospital` VARCHAR(45) NOT NULL,
  `telefonoHospital` INT(11) NOT NULL,
  PRIMARY KEY (`idhospital`));
  
  la api hospital se consume asi http://localhost:3200/api/hospital: 
  */