import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info.dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './info.dialog.component.html',
  styleUrl: './info.dialog.component.css'
})
export class InfoDialogComponent {
  
  title = 'Info';
  message = 'Operação realizada com sucesso.';

  constructor(
    public matDialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.title = this.data.title ? this.data.title : 'Info';
    this.message = this.data.message ? this.data.message : 'Operação realizada com sucesso.';
  }

  close(): void {
    this.matDialogRef.close();
  }
}
