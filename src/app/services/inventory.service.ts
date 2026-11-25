import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface InventoryProduct {
  id: number;
  name: string;
  category: string;
  category_id: number;
  image: string;
  description: string;
  available_units: number;
  shelf: string;
  shelf_id: number | null;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly productsUrl = `${environment.apiBaseUrl}/order/products/`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<InventoryProduct[]> {
    return this.http.get<InventoryProduct[]>(this.productsUrl);
  }
}
