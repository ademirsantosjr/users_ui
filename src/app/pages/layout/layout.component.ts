import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersComponent } from '../users/users.component';
import { constants as constants } from '../../constants/constants';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    UsersComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router) {

  }

  logout() {
    localStorage.removeItem(`${constants.localStorage.tokenDefinition}`)
    this.router.navigateByUrl(`/${constants.path.loginPage}`)
  }
}
