import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private authService: AuthService) {
    if (this.authService.isLogged()) {
      this.authService.goToDashboardPage();
    }
  }

  ngOnInit(): void {
  }

}
