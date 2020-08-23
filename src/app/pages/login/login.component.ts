import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { AuthService, UserLogin } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserLogin;
  userForm: FormGroup;
  usernameFormControl: FormControl;
  passwordFormControl: FormControl;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    if (this.authService.isLogged()) {
      this.authService.goToDashboardPage();
    }
    this.initUser();
    this.initForm();
  }

  ngOnInit(): void { }

  initUser(): void {
    this.user = {
      username: '',
      password: ''
    };
  }

  initForm(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, this.validateUsername.bind(this)]],
      password: ['', [Validators.required, this.validatePassword.bind(this)]]
    });

    this.usernameFormControl = this.userForm.get('username') as FormControl;
    this.passwordFormControl = this.userForm.get('password') as FormControl;
  }

  private validateUsername(usernameFormControl: AbstractControl): { [key: string]: boolean } | null {
      const validUsername = usernameFormControl.value === this.authService.getValidUsername();
      return validUsername ? null : { invalidUsername: true };
  }

  private validatePassword(passwordFormControl: AbstractControl): { [key: string]: boolean } | null{
      const validPassword = passwordFormControl.value === this.authService.getValidPassword();
      return validPassword ? null : { invalidPassword: true };
  }

  onLogin(): void {
    if (this.userForm.valid) {
      this.authService.login(this.user);
      this.authService.goToDashboardPage();
    }
  }

}
