import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ItemsService } from './items.service';
import { environment } from '../../environments/environment';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ItemsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('falls back to placeholder text when description is omitted (Python-shaped response)', () => {
    let actual: string | undefined;
    service.getItems().subscribe((result) => (actual = result.items[0].description));

    const req = httpMock.expectOne((r) => r.url === `${environment.apiBaseUrl}/items`);
    req.flush({
      items: [{ id: 1, name: 'Widget C', createdAt: '2026-01-01T00:00:00Z' }],
      total: 1,
    });

    expect(actual).toBe('No description provided');
  });

  it('falls back to placeholder text when description is null (.NET-shaped response)', () => {
    let actual: string | undefined;
    service.getItems().subscribe((result) => (actual = result.items[0].description));

    const req = httpMock.expectOne((r) => r.url === `${environment.apiBaseUrl}/items`);
    req.flush({
      items: [{ id: 1, name: 'Widget C', description: null, createdAt: '2026-01-01T00:00:00Z' }],
      total: 1,
    });

    expect(actual).toBe('No description provided');
  });
});
