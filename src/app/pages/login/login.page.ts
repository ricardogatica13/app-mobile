import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbGestionService } from 'src/app/services/db-gestion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_contrasena: string = '';
  mdl_correo: string = '';

  correo: string = '';
  nombre: string = '';
  apellido: string = '';
  carrera: string = '';
  
  isToastOpen = false;
  mensaje: string='';
  
  constructor(private router: Router, private api: ApiService, private bd: DbGestionService) {}

  async ngOnInit() {
    await this.bd.crearDB();
    await this.bd.crearTabla();

  }

  navegarCrear(){
    this.router.navigate(['crear-usuario'])
  }

  async login(){
    let datos = this.api.login(
      this.mdl_correo, this.mdl_contrasena
    )

    let respuesta = await lastValueFrom(datos);
    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    if(json.status == 'success'){
      this.correo = json.usuario.correo;
      this.nombre = json.usuario.nombre;
      this.apellido = json.usuario.apellido;
      this.carrera = json.usuario.carrera;
      await this.crearUsuarioBD();   
      console.log('MPS '+json.usuario.carrera);
      this.router.navigate(['principal']);
    }
    else{
      this.isToastOpen = true
      this.mensaje = json.message
      console.log('MPS: '+json.message);
    }
  }

  async crearUsuarioBD(){
    this.bd.guardarRegistros(this.correo,this.nombre,this.apellido,this.carrera);
  }


    setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
  



