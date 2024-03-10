import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IUser } from '../../model/user';
import { UserService } from '../../service/users/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: IUser[]=[];

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.findAll()
      .subscribe({
        next: (users: IUser[]) => {
          this.users = users
        },
        error: (err) => {
          alert('Erro ao carregar a lista de usuários!')
        }
      });
  }
}
