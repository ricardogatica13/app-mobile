import { Injectable, OnInit } from '@angular/core';
import { SQLite, SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbGestionService  {
  private base: SQLiteObject | null = null;
  listaUsuario: any[] = [];

  constructor(private sqlite: SQLite) { }


  async crearDB(){
    this.base = await this.sqlite.create({
      name: "datos.db",
      location: "default"
    })
    console.log("MPS: BD CREADA CORRECTAMENTE")
  }

  async crearTabla(){
    await this.crearDB()
    this.base?.executeSql("CREATE TABLE IF NOT EXISTS USUARIO (CORREO VARCHAR(50), NOMBRE VARCHAR(50), APELLIDO VARCHAR(50), CARRERA VARCHAR(50))", []);
    console.log('MPS_DB: TABLA CREADA CORRECTAMENTE');
  }

  async guardarRegistros(correo: string,  nombre: string, apellido: string, carrera: string){
    await this.crearDB()
    this.base?.executeSql("INSERT INTO USUARIO VALUES(?, ?, ?, ?)",[correo, nombre, apellido, carrera]);
    console.log('MPS_DB:  REGISTRO GUARDADO CORRECTAMENTE');
  }

  async mostrarUsuarios(){
    await this.crearDB()
    this.listaUsuario = []

    try {
      console.log('MPS: SE EJECUTA CONSULTA')
      let dato = await this.base?.executeSql('SELECT CORREO, NOMBRE, APELLIDO, CARRERA FROM USUARIO', []);
      console.log('MPS: SE EJECUTO LA WEA')
      if(dato?.rows.length > 0){
        return {
          correo: dato.rows.item(0).CORREO,
          nombre: dato.rows.item(0).NOMBRE,
          apellido: dato.rows.item(0).APELLIDO,
          carrera: dato.rows.item(0).CARRERA
        };
      }
      return null;

    }
    catch (e){
      console.log('MPS: ' + JSON.stringify(e));
    }
    return null;
  }

  async eliminarRegistro(){
    await this.crearDB()
    this.base?.executeSql("DELETE FROM USUARIO",[]);
    console.log('MPS_DB: REGISTRO ELIMINADO CORRECTAMENTE');
  }

  async actualizarRegistros(correo: string, carrera: string){
    await this.crearDB()
    this.base?.executeSql("UPDATE USUARIO SET CARRERA = (?) WHERE CORREO = (?)",[carrera, correo]);
    console.log('MPS_DB: REGISTRO ACTUALIZADO CORRECTAMENTE');
  }
}
