import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  constructor(private authService: AuthService) {
    if (!this.authService.isLogged()) {
      this.authService.goToLoginPage();
    }
  }

  ngOnInit(): void {
  }

}
