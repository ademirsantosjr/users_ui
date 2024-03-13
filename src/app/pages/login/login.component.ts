import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenData } from '../../model/tokendata';
import { Login } from '../../model/login';
import { LoginService } from '../../service/login/login.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { constants } from '../../constants/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: Login;

  constructor(
    private router: Router,
    private loginService: LoginService) {
    this.login = new Login();
  }

  onSubmit() {
    this.loginService.authenticate(this.login)
      .subscribe({
        next: (res: TokenData) => {
          if(res.authenticated) {
            alert('Login realizado com sucesso.');
            localStorage.setItem(`${constants.localStorage.tokenDefinition}`, JSON.stringify(res));
            this.router.navigateByUrl('/users');
          }
        },
        error: (err) => {
          alert('Falha no Login! Verifique suas credenciais.');
        }
      });
  }
}
