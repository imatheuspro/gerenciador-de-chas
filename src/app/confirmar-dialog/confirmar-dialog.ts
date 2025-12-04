import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-dialog.html',
  styleUrl: './confirmar-dialog.css'
})
export class ConfirmarDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
