export interface ApiItem {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface ApiPagedResult {
  items: ApiItem[];
  total: number;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
}

export interface ItemViewModel {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}
