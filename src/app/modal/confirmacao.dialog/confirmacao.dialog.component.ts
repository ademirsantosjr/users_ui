import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-confirmacao.dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmacao.dialog.component.html',
  styleUrl: './confirmacao.dialog.component.css'
})
export class ConfirmacaoDialogComponent {

  title = 'Confirmar';
  message = 'Tem certeza?';
  usuario: string = 'o Usuário'

  constructor(
    public matDialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.title = this.data.title ? this.data.title : 'Confirmar';
    this.message = this.data.message ? this.data.message : 'Tem certeza?';
  }

  onConfirm(): void {
    this.matDialogRef.close(true);
  }

  onDismiss(): void {
    this.matDialogRef.close(false);
  }
}
