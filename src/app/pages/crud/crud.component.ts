import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor(private authService: AuthService) {
    if (!this.authService.isLogged()) {
      this.authService.goToLoginPage();
    }
  }

  ngOnInit(): void {
  }

}
