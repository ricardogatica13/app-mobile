import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta: string='https://www.s2-studio.cl';

  constructor(private http:HttpClient) {}

  crearUsuario(correo:string, contrasena: string, nombre:string, 
    apellido:string, carrera:string){
      let usuario: any={};
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.nombre = nombre;
      usuario.apellido = apellido;
      usuario.carrera = carrera;

      return this.http.post(this.ruta + "/api_duoc/usuario/usuario_almacenar", usuario).pipe();

  }

  login(correo: string, contrasena: string){
    let usuario: any = {};
    usuario.correo = correo;
    usuario.contrasena = contrasena;

    return this.http.post(this.ruta + "/api_duoc/usuario/usuario_login", usuario).pipe();
  }

  modificarDatos(correo: string, contrasena: string, carrera: string ){
    let datos : any = {};
    datos.correo = correo;
    datos.contrasena = contrasena;
    datos.carrera = carrera;
    return  this.http.patch(this.ruta + "/api_duoc/usuario/usuario_modificar", datos).pipe();
  }


  obtenerSedes(){
    return this.http.get(this.ruta + "/api_duoc/usuario/sedes_obtener").pipe()
  }
  obtenerAsistencias(){
    return this.http.get(this.ruta + "/api_duoc/usuario/asistencia_obtener?correo=rikardo").pipe()
  }
}
