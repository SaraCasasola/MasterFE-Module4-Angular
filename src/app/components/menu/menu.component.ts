import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  isUserLogged: boolean;
  userLoginSuscription: Subscription;

  constructor(private authService: AuthService) {
    this.isUserLogged = this.authService.isLogged();
    this.userLoginSuscription = this.authService.loginStatusChange.subscribe((loginState) => {
      this.isUserLogged = loginState;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userLoginSuscription.unsubscribe();
  }

}
