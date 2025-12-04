import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../service/produtos';
import { Produto } from '../model/produto';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-produto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './formulario-produto.html',
  styleUrl: './formulario-produto.css'
})
export class FormularioProduto {

  form!: FormGroup;
  id: string | null = null;

  categorias = [
  "Chá Verde",
  "Chá Preto",
  "Chá Branco",
  "Chá Oolong",
  "Chá Pu-erh",
  "Chá Amarelo",
  "Ervas / Infusões",
  "Misturas / Blends"];

  constructor(
    private fb: FormBuilder,
    private service: ProdutosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      quantidade: [null, [Validators.required, Validators.min(0)]]
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.service.getById(this.id).subscribe((produto: Produto) => {
        this.form.patchValue(produto);
      });
    }
  }

  salvar() {
  if (this.form.invalid) return;

  if (this.id) {
    this.service.update(this.id, this.form.value).subscribe(() => {
      this.snackBar.open('Produto atualizado com sucesso!', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/produtos']);
    });
  } else {
    this.service.create(this.form.value).subscribe(() => {
      this.snackBar.open('Produto criado com sucesso!', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/produtos']);
    });
  }
}

  cancelar() {
    this.router.navigate(['/produtos']);
  }
}



