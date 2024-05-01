import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private router: Router) { }
  authenticate = false;
  setAuthentication(auth: boolean) {
    if (auth) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.setItem('isLoggedIn', 'false');
    }
  }

  canActivate() {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  async login(email: string, password: string) { //called when clicked login
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password); //using auth(), email, and password this will login the user
  }

  async signup(email: string, password: string) { //called when clicked signup
    const auth = getAuth();
    return await createUserWithEmailAndPassword(auth, email, password); //using email and password this will create a user
  }
}
