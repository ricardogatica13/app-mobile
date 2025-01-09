import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbGestionService } from 'src/app/services/db-gestion.service';

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.page.html',
  styleUrls: ['./modificar-datos.page.scss'],
})
export class ModificarDatosPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';
  mdl_carrera: string = '';

  
  isToastOpen = false
  mensaje : string = ''


  constructor(private api: ApiService, private router: Router, private navCtrl:  NavController, private db: DbGestionService) { }


  ngOnInit() {
  }

  modificarDatos(){
    this.api.modificarDatos(this.mdl_correo, this.mdl_contrasena, this.mdl_carrera)
  }

  async cambioDatos(){

    
    let datos = this.api.modificarDatos(this.mdl_correo, this.mdl_contrasena, this.mdl_carrera)
    let respuesta = await lastValueFrom(datos)
    let jsontexto = JSON.stringify(respuesta)
    let json= JSON.parse(jsontexto)

    if (json.status=='success'){
      await this.actualizarDatos();
      this.isToastOpen = true
      this.mensaje = json.message
      setTimeout(() => {
        this.router.navigate(['principal'])
        console.log('MPS: ', json.message)
      }, 2000);

    }else{
        console.log('MPS: ', json.message)
        this.isToastOpen = true
        this.mensaje = json.message
    }
  }

  async actualizarDatos(){
    this.db.actualizarRegistros(this.mdl_correo, this.mdl_carrera)
  }

  volver() {
    this.navCtrl.back();
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  
}
