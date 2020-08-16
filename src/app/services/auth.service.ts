import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

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

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.logged = false;
  }

  public login(userLogin: UserLogin): boolean {
    this.logged = (userLogin.username === this.validUser.username) &&
      (userLogin.password === this.validUser.password);

    if (this.logged) {
      this.storeOnLocalStorage();
    }
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

  public getPassword(): string {
    return this.validUser.password;
  }

  private storeOnLocalStorage(): void {
    this.storage.set('isMasterAngularUserLogged', true);
  }
}
