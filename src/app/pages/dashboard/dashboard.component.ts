import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) {
    if (!this.authService.isLogged()) {
      this.authService.goToLoginPage();
    }
  }

  ngOnInit(): void {
  }

}
