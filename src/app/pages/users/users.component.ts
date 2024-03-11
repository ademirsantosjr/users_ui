import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../../model/user';
import { UserService } from '../../service/users/user.service';
import { LoginService } from '../../service/login/login.service';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: IUser[]=[];
  displayedColumns: string[] = ['username', 'email', 'profile'];
  dataSource = new MatTableDataSource<IUser>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private loginService: LoginService) {
    this.loginService.$tokenRefreshed.subscribe({
      next: (res: any) => {
        this.getAllUsers();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    debugger;
    this.userService.findAll()
      .subscribe({
        next: (users: IUser[]) => {
          this.users = users
          this.dataSource.data = users;
        },
        error: (err) => {
          alert('Erro ao carregar a lista de usuários!')
        }
      });
  }
}
