import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ProdutosService } from '../service/produtos';
import { Produto } from '../model/produto';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDialog } from '../../confirmar-dialog/confirmar-dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css'
})
export class ListaProdutos implements OnInit, AfterViewInit {

  displayedColumns = ['nome', 'descricao', 'preco', 'categoria','quantidade', 'acoes'];

  dataSource = new MatTableDataSource<Produto>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
  private service: ProdutosService,
  private router: Router,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.service.list().subscribe(dados => {
      this.dataSource.data = dados;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  novoProduto() {
    this.router.navigate(['/produtos/novo']);
  }

  editar(id: string) {
    this.router.navigate(['/produtos/editar', id]);
  }

  remover(id: string) {

    const produto = this.dataSource.data.find(p => p.id === id);

    const dialogRef = this.dialog.open(ConfirmarDialog, {
      data: { nome: produto?.nome }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
          this.service.delete(id).subscribe(() => {

          this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);

          this.snackBar.open('Produto removido com sucesso!', 'OK', {
          duration: 3000
          });
        });
      }
    });
  }
}
