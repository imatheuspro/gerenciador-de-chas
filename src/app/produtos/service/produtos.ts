import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/produto';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  export class ProdutosService {

    private API_URL = "http://localhost:3000/products";

    constructor(private http: HttpClient) {}

    list(): Observable<Produto[]> {
      return this.http.get<Produto[]>(this.API_URL).pipe(first());
    }

    create(produto: Produto) {
      return this.http.post<Produto>(this.API_URL, produto).pipe(first());
    }

    update(id: string, produto: Produto){
      return this.http.put<Produto>(`${this.API_URL}/${id}`, produto).pipe(first());
    }

    getById(id: string) {
      return this.http.get<Produto>(`${this.API_URL}/${id}`).pipe(first());
    }

    delete(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(first());
  }
}



