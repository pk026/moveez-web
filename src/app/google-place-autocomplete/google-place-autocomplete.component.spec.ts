import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePlaceAutocompleteComponent } from './google-place-autocomplete.component';

describe('GooglePlaceAutocompleteComponent', () => {
  let component: GooglePlaceAutocompleteComponent;
  let fixture: ComponentFixture<GooglePlaceAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglePlaceAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePlaceAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
