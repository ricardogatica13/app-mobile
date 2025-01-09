import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DbGestionService } from 'src/app/services/db-gestion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  mdl_nombre: string =  '';
  mdl_apellido: string =  '';
  mdl_correo: string  =  '';
  mdl_carrera: string  =  '';

  constructor(private router: Router, private db: DbGestionService, private navCtrl:  NavController) { }


async  ngOnInit() {
    await this.db.crearTabla(); // Aseguramos que la tabla existe
    await this.datosPerfil();
  }
  modificarDatos(){
    this.router.navigate(['modificar-datos'])
  }

  // async traerDatos(){
  //   let resultado = await this.db.mostrarUsuarios()
  //   .then((resultado) =>
  //   {
  //     this.mdl_nombre = resultado?.nombre;
  //     this.mdl_apellido = resultado?.apellido;
  //     this.mdl_correo =  resultado?.correo;
  //     this.mdl_carrera = resultado?.carrera;
  //   })
  //   .catch((error) =>{
  //     console.log('MPS: ERROR AL OBTENER LOS DATOS: ', error);
  //   })
  // }

  async datosPerfil() {
    let datos = await this.db.mostrarUsuarios();

    if (datos) {
      this.mdl_correo = datos.correo
      this.mdl_nombre = datos.nombre
      this.mdl_apellido = datos.apellido
      this.mdl_carrera = datos.carrera
    }
  }

  volver() {
    this.navCtrl.back();
  }
}
