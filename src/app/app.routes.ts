import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsersComponent } from './pages/users/users.component';
import { authGuard } from './service/auth.guard';
import { constants } from './constants/constants';

export const routes: Routes = [
    {
        path: '', 
        redirectTo:`/${constants.path.loginPage}`, 
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'',
        component: LayoutComponent,
        children: [
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [authGuard]
            }
        ]
    }
];
