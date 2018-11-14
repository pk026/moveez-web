import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GooglePlaceAutocompleteComponent } from './google-place-autocomplete/google-place-autocomplete.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyCalendarComponent } from './company-calendar/company-calendar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SlotBookedComponent } from './slot-booked/slot-booked.component';

export const AppRoutes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'company/:id', component: CompanyCalendarComponent},
  { path: 'booked-slot/:id', component: SlotBookedComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GooglePlaceAutocompleteComponent,
    CompanyCalendarComponent,
    MainPageComponent,
    SlotBookedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    }),
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
