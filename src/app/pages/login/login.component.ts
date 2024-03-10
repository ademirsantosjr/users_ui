import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: Login;

  constructor(private http: HttpClient) {
    this.login = new Login();
  }

  onSubmit() {
    this.http.post('http://localhost:8080/auth/signin', this.login)
      .subscribe({
        next: (res: any) => {
          if(res.authenticated) [
            alert('Login realizado com sucesso.')
          ]
        },
        error: (err) => {
          alert('Falha no Login! Verifique suas credenciais.')
        }
      })
  }
}

export class Login {
  username: string;
  password: string;
  constructor() {
    this.username = '';
    this.password = '';
  }
}
