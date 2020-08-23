import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

export interface UserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private localStorageLoginKey = 'IS_USER_LOGGED';
  private localStorageUsernameKey = 'USERNAME';

  private validUser: UserLogin = {
    username: 'master8@lemoncode.net',
    password: '12345678'
  };

  private logged: boolean;

  loginStatusChange: Subject<boolean>;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) {
    this.loginStatusChange = new Subject<boolean>();
    this.logged = this.storage.get(this.localStorageLoginKey) || false;
  }

  public login(userLogin: UserLogin): boolean {
    this.logged = (userLogin.username === this.validUser.username) &&
      (userLogin.password === this.validUser.password);

    if (this.logged) {
      this.storeOnLocalStorage(true, userLogin.username);
      this.loginStatusChange.next(this.logged);
    }
    return this.logged;
  }

  public logout(): void {
    this.logged = false;
    this.loginStatusChange.next(this.logged);
    this.storeOnLocalStorage(false);
  }

  public isLogged(): boolean {
    return this.logged;
  }

  public getUsername(): string {
    return this.storage.get(this.localStorageUsernameKey);
  }

  public getValidUsername(): string {
    return this.validUser.username;
  }

  public getValidPassword(): string {
    return this.validUser.password;
  }

  public goToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  public goToDashboardPage(): void {
    this.router.navigate(['/dashboard']);
  }

  private storeOnLocalStorage(loginValue: boolean, username: string = ''): void {
    this.storage.set(this.localStorageLoginKey, loginValue);
    this.storage.set(this.localStorageUsernameKey, username);
  }
}
