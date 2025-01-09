import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbGestionService } from 'src/app/services/db-gestion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private router : Router, private api : ApiService, private db : DbGestionService) { }

  listaSedes : any = []

  ngOnInit() {
    console.log('hola');
    this.listarSedes();
  }

navegarPerfil(){
  this.router.navigate(['perfil'])
}

async listarSedes(){
  this.listaSedes = []

  let datos = this.api.obtenerSedes()
  let respuesta = await lastValueFrom(datos)
  let json_texto = JSON.stringify(respuesta)
  let json = JSON.parse(json_texto)

  for(let x = 0; x < json[0].length; x++){
    let sede : any = {}
    
    sede.nombre = json[0][x].NOMBRE
    sede.direccion = json[0][x].DIRECCION
    sede.telefono = json[0][x].TELEFONO
    sede.horario = json[0][x].HORARIO_ATENCION
    sede.imagen = json[0][x].IMAGEN

    this.listaSedes.push(sede)
  }
}
async cerrarSesion(){
  await this.db.eliminarRegistro();
  this.router.navigate(['login'])
}

navegarLeerQR(){
  this.router.navigate(['leer-qr'])
}
}
