import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ishoes, shoes } from '../shoes/shoes.model';
import { HomeService } from './home.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Shoes: shoes = new shoes();
  shoesList: ishoes[] = [];
  isLoading: boolean = true;
  LoadingText: String = 'Loading...';

  constructor(private router : Router,
    private authenticationService : AuthenticationService,
    private homeService : HomeService, private alertController : AlertController,
    private toastController : ToastController
  ) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(header: string, message: string) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      position: 'top',
      duration: 2000
    })
    await toast.present();
  }

  
  async shoe() { //reloading data
    this.isLoading = true;
    setTimeout(async () => {
      this.shoesList = await this.homeService.getShoes();
      this.isLoading = false;
    }, 2000);
  }

  save() { //saving data
    if (this.Shoes.id) {
      this.homeService.tryUpdate(this.Shoes);
      this.presentAlert('Update', 'The data has been updated.');
    } else {
      this.homeService.tryAdd(this.Shoes);
      this.presentToast('Success', 'The data has been added.');
    }
    this.Shoes = new shoes();
    this.shoe();
  }

  edit(Shoes: ishoes) { //editing data
    this.Shoes = Shoes;
  }

  async delete(Shoes: shoes) { //deleting data
    this.isLoading = true;
    await this.homeService.tryDelete(Shoes);
    this.presentAlert('Success', 'The data has been deleted.');
    this.shoe();
    this.Shoes = new shoes();
    this.isLoading = false;
  }

  logOut() { //back to login
    this.authenticationService.setAuthentication(false);
    this.router.navigate(['login']);
  }
}
