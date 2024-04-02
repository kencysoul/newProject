import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  user: any;
  data: any;

  constructor(private route : Router,
    private dataService : DataService,
    private alertController : AlertController,
    private toastController : ToastController,
    private authenticationService : AuthenticationService
    ) {}
    volume = 100;

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.loadData();
    this.authenticationService.authenticate = false;
  }

  async loadData() {
    await this.dataService.fetchData().subscribe((response) => {
      this.data = response.entries;
      this.data = this.data.slice(0, 4);
      console.log(this.data);
    });
  }

  logout() {
    this.route.navigate(['login']);
    localStorage.removeItem('user');
  }

  async alert() {
    const alert = await this.alertController.create({
      header:'Alert!',
      subHeader: 'alert message',
      message: 'This is just an alert',
      buttons: ['OK']
    });
    await alert.present();
  }

  async toast() {
    const toast = await this.toastController.create({
      message: 'Toast component',
      duration: 3000
    });
    toast.present();
  }

  async dismissToast() {
    const toast = await this.toastController.getTop();
    if (toast){
      toast.dismiss();
    }
  }
}
