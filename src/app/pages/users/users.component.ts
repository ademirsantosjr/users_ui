import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../../model/user';
import { UserService } from '../../service/users/user.service';
import { LoginService } from '../../service/login/login.service';

import {PageEvent, MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IPage } from '../../dto/pageusers';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule, 
    MatTableModule, 
    MatButtonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: IUser[]=[];
  displayedColumns: string[] = ['username', 'email', 'profile', 'actions'];
  dataSource = new MatTableDataSource<IUser>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  length: number = 0;
  pageIndex: number = 0;
  pageSize: number = 5;

  searchFormControl = new FormControl('');

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
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.getRangeLabel = this.rangeTranslate;
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.findAll(this.pageIndex, this.pageSize)
      .subscribe({
        next: (pagedUsers: IPage<IUser>) => {
          this.users = pagedUsers.content;
          this.dataSource = new MatTableDataSource<IUser>(this.users);
          this.length = pagedUsers.totalElements;
          this.pageIndex = pagedUsers.pageable.pageNumber;
          this.pageSize = pagedUsers.pageable.pageSize;
          this.users = pagedUsers.content
        },
        error: (err) => {
          alert('Erro ao carregar a lista de usuários!')
        }
      });
  }

  private rangeTranslate = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
