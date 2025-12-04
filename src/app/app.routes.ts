import { Routes } from '@angular/router';
import { ListaProdutos } from './produtos/lista-produtos/lista-produtos';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },

  {
    path: 'produtos',
    loadComponent: () =>
      import('./produtos/lista-produtos/lista-produtos')
        .then(c => c.ListaProdutos)
  },

  {
    path: 'produtos/novo',
    loadComponent: () =>
      import('./produtos/formulario-produto/formulario-produto')
        .then(c => c.FormularioProduto)
  },
  {
  path: 'produtos/editar/:id',
  loadComponent: () =>
    import('./produtos/formulario-produto/formulario-produto')
      .then(c => c.FormularioProduto)
  }
];

