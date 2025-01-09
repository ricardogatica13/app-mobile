import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  mdl_correo: string='';
  mdl_contrasena: string='';
  mdl_nombre: string='';
  mdl_apellido: string='';
  mdl_carrera: string='';

  isToastOpen = false;
  mensaje:  string = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  async almacenarUsuario(){
    let datos = this.api.crearUsuario(
      this.mdl_correo, this.mdl_contrasena,
      this.mdl_nombre, this.mdl_apellido, this.mdl_carrera
    );

    let respuesta = await lastValueFrom(datos);

    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    if(json.status == 'success'){
      this.isToastOpen = true;
      this.mensaje = json.message
      setTimeout(() => {
        this.router.navigate(['login'])
      }, 2000);
      console.log('MPS' + json.message)
    } else{
      this.isToastOpen = true;
      this.mensaje = json.message
      setTimeout(() => {
        this.mdl_correo = ''
        this.mdl_contrasena = ''
        this.mdl_nombre = ''
        this.mdl_apellido = ''
        this.mdl_carrera = ''
      }, 2000);
    }
  };

  setOpen(isOpen: boolean){
    this.isToastOpen = isOpen;
  }


}

