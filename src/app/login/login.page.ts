import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string = '';
  pw: string = '';
  accounts: any[] =[
    {user: "admin", pw: "admin"}, {user: "user1", pw: "user1"}
  ]
  constructor() { }

  ngOnInit() {
  }

  async login() {
    
  }
}
