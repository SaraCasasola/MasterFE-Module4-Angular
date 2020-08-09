import { Injectable } from '@angular/core';

export interface UserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private validUser: UserLogin = {
    username: 'master8@lemoncode.net',
    password: '12345678'
  };

  private logged: boolean;

  constructor() {
    this.logged = false;
  }

  public login(userLogin: UserLogin): boolean {
    this.logged = (userLogin.username === this.validUser.username) &&
      (userLogin.password === this.validUser.password);

    return this.logged;
  }

  public logout(): void {
    this.logged = false;
  }

  public isLogged(): boolean {
    return this.logged;
  }

  public getUsername(): string {
    return this.validUser.username;
  }
}
