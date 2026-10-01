import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from './services/items.service';
import { ItemViewModel } from './models/item';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly itemsService = inject(ItemsService);

  items: ItemViewModel[] = [];
  total = 0;
  loading = false;
  newName = '';
  newDescription = '';
  createError: string | null = null;

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.itemsService.getItems().subscribe({
      next: (result) => {
        this.items = result.items;
        this.total = result.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get isAddDisabled(): boolean {
    return !this.newDescription.trim();
  }

  onCreate(): void {
    this.createError = null;
    this.itemsService.createItem({ name: this.newName, description: this.newDescription || undefined }).subscribe({
      next: () => {
        this.newName = '';
        this.newDescription = '';
        this.loadItems();
      },
      error: () => {
        this.createError = 'Could not add item.';
      },
    });
  }
}
