import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-static-header',
  templateUrl: './static-header.component.html',
  styleUrls: ['./static-header.component.scss']
})
export class StaticHeaderComponent implements OnInit, OnDestroy {

  angularLogo: string;
  username: string;
  userLoginSuscription: Subscription;
  isUserLogged: boolean;

  constructor(private authService: AuthService) {
    this.angularLogo = 'assets/logo/logo.png';
    this.initLoggedState();
  }

  private initLoggedState(): void {
    this.isUserLogged = this.authService.isLogged();
    this.setUsername();

    this.userLoginSuscription = this.authService.loginStatusChange.subscribe((loginState) => {
      this.isUserLogged = loginState;
      this.setUsername();
    });
  }

  private setUsername(): void {
    if (this.isUserLogged) {
      this.username = this.authService.getUsername();
    }
  }

  public onLogout(): void {
    this.authService.logout();
    this.authService.goToLoginPage();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userLoginSuscription.unsubscribe();
  }

}
