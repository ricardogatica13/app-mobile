import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbGestionService } from 'src/app/services/db-gestion.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private  router: Router, private db: DbGestionService) { }

  ngOnInit(){
    setTimeout(async () => {
      let login = await this.db.mostrarUsuarios()
    if(!login){
      this.router.navigate(['/login'], {replaceUrl: true});
    }
    else{
      this.router.navigate(['/principal'], {replaceUrl:true});
    }
  },3000)
  }

  // ngOnInit() {
  //   setTimeout(async() => {
  //     let login = await
  //   }, 3000);
  // }

}
