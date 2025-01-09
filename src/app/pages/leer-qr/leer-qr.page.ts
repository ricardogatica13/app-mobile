import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbGestionService } from 'src/app/services/db-gestion.service';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQRPage implements OnInit {
  texto : string ='';

  listaAsistencias : any = []
  mdl_correo: string  =  '';

  constructor(private router : Router, private api : ApiService, private db : DbGestionService) { }

  ngOnInit() {
    BarcodeScanner.installGoogleBarcodeScannerModule();
    this.listarAsistencias();
  }

  async datosPerfil() {
    let datos = await this.db.mostrarUsuarios();

    if (datos) {
      this.mdl_correo = datos.correo
    }
  }

  async  leerQR(){
    let resultado = await BarcodeScanner.scan();
    if(resultado.barcodes.length>0){
      this.texto= resultado.barcodes[0].displayValue;
      console.log(this.texto)
    }
  }


//
async listarAsistencias(){
  this.listaAsistencias = []

  let datos = this.api.obtenerAsistencias()
  let respuesta = await lastValueFrom(datos)
  let json_texto = JSON.stringify(respuesta)
  let json = JSON.parse(json_texto)

  for(let x = 0; x < json[0].length; x++){
    let asignatura : any = {}
    
    asignatura.sigla = json[0][x].curso_sigla
    asignatura.nombre = json[0][x].curso_nombre
    asignatura.presente = json[0][x].presente
    asignatura.ausente = json[0][x].ausente



    this.listaAsistencias.push(asignatura)
  }
}
//


}
