import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiItem, ApiPagedResult, CreateItemRequest, ItemViewModel } from '../models/item';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getItems(page = 1, pageSize = 10): Observable<{ items: ItemViewModel[]; total: number }> {
    return this.http
      .get<ApiPagedResult>(`${this.baseUrl}/items`, { params: { page, pageSize } })
      .pipe(map((result) => ({ items: result.items.map(toViewModel), total: result.total })));
  }

  createItem(request: CreateItemRequest): Observable<ItemViewModel> {
    return this.http.post<ApiItem>(`${this.baseUrl}/items`, request).pipe(map(toViewModel));
  }
}

function toViewModel(item: ApiItem): ItemViewModel {
  const { id, name, description, createdAt } = item;
  return { id, name, description: description ?? 'No description provided', createdAt };
}
