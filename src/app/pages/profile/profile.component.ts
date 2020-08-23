import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) {
    if (!this.authService.isLogged()) {
      this.authService.goToLoginPage();
    }
  }

  ngOnInit(): void {
  }

}
