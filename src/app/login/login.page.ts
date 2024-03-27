import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string = '';
  pw: string = '';
  isToastOpen: boolean = false;
  isValid: boolean = false;
  accounts: any[] =[
    {username: "admin", password: "admin"}, {username: "user1", password: "user1"}
  ]
  constructor(private route : Router, private alertControl : AlertController, private toastControl : ToastController) { }

  ngOnInit() {
  }

  async login() {
    
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].username == this.user && this.accounts[i].password == this.pw){
        this.isValid = true;
      }
    }
    if (this.isValid) {
      const alert = await this.alertControl.create({
        header: 'Login',
        subHeader: 'Status',
        message: 'Login Successful!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              localStorage.setItem('user', this.user); //setting session variable
            }
          }
        ]
      });
  
      await alert.present();
      setTimeout(() => {
        this.route.navigate(['dashboard/home'])
      }, 1000) //delay
      
    } else {
      this.loginFailed()
    }
  }

  async loginFailed(){
    const toast = await this.toastControl.create({
      message: 'Login Failed',
      duration: 3000 //delay
    });
    toast.present();
  }
}
