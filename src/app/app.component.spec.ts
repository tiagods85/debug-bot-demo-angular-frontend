import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  function createAndLoad() {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    httpMock.expectOne((r) => r.url.endsWith('/items')).flush({ items: [], total: 0 });
    return fixture;
  }

  it('should create the app', () => {
    const fixture = createAndLoad();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the page title', () => {
    const fixture = createAndLoad();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Debug Bot Demo');
  });

  it('disables Add when the required name field is blank', () => {
    const fixture = createAndLoad();
    const app = fixture.componentInstance;

    app.newName = '';
    app.newDescription = 'has a description but no name';

    expect(app.isAddDisabled).toBeTrue();
  });

  it('does not disable Add when only the optional description is blank', () => {
    const fixture = createAndLoad();
    const app = fixture.componentInstance;

    app.newName = 'Widget E';
    app.newDescription = '';

    expect(app.isAddDisabled).toBeFalse();
  });
});
