import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../../../model/user';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user.form.dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './user.form.dialog.component.html',
  styleUrl: './user.form.dialog.component.css'
})
export class UserFormDialogComponent {

  title = 'Formulário';
  user: IUser = {name: '', email: '', profile: '', password: ''};
  profiles: string[] = [];

  constructor(
    public matDialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.title = this.data.title;
    this.profiles = this.data.profiles;
    if (this.data.user != null) {
      this.user = this.data.user;
    }    
  }

  onSubmit() {
    this.matDialogRef.close(this.user);
  }

  close() {
    this.matDialogRef.close();
  }

}
