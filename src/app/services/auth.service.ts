import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subject } from 'rxjs';

export interface UserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private localStorageLoginKey: string = 'IS_USER_LOGGED';

  private validUser: UserLogin = {
    username: 'master8@lemoncode.net',
    password: '12345678'
  };

  private logged: boolean;

  loginStatusChange: Subject<boolean>;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {    
    this.loginStatusChange = new Subject<boolean>();
    this.logged = this.storage.get(this.localStorageLoginKey) || false;
  }

  public login(userLogin: UserLogin): boolean {
    this.logged = (userLogin.username === this.validUser.username) &&
      (userLogin.password === this.validUser.password);

    if (this.logged) {
      this.storeOnLocalStorage();
      this.loginStatusChange.next(this.logged);
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
    this.storage.set(this.localStorageLoginKey, true);
  }
}
