import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { distinctUntilChanged, fromEvent, switchMap, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule, 
    MatTableModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: IUser[]=[];
  displayedColumns: string[] = ['username', 'email', 'profile', 'actions'];
  dataSource = new MatTableDataSource<IUser>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  readonly pageIndexDefault = 0;
  readonly pageSizeDefault = 5;
  length: number = 0;
  pageIndex: number = this.pageIndexDefault;
  pageSize: number = this.pageSizeDefault;

  @ViewChild('filter', { static: true }) filter!: ElementRef;
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
    this.addEventToFilter();
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

  addNew() {

  }

  addEventToFilter() {
    fromEvent(this.filter.nativeElement, 'input').pipe(
      distinctUntilChanged(),
      switchMap(() => {
        if (this.filter.nativeElement.value) {
          const usernameOrEmail = this.filter.nativeElement.value
          return this.userService.findByUsernameOrEmail(
            usernameOrEmail, this.pageIndexDefault, this.pageSizeDefault);
        }
        return this.userService.findAll(this.pageIndexDefault, this.pageSizeDefault);
      })
    ).subscribe((page: IPage<IUser>) => {
      if (!this.dataSource) {
        return;
      }
      this.paginator.pageIndex = 0;
      this.pageIndex = 0;

      this.dataSource = new MatTableDataSource<IUser>(page.content);
      this.length = page.totalElements;

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
