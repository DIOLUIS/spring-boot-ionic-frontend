import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.services';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   creds : CredenciaisDTO = {
     
     email: "",
     senha: "" 
   };


  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave(){
      this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken().subscribe(Response => {
    this.auth.successfullLogin(Response.headers.get('Authorization'));
    this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
    

  }
  
  login(){
    this.auth.authenticade(this.creds).subscribe(Response => {
      this.auth.successfullLogin(Response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
   }

}
