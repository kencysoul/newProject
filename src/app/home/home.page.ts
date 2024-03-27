import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  user: any;
  data: any;

  constructor(private route : Router, private dataService : DataService) {}
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.loadData();
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
}
