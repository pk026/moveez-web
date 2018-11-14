import { take } from 'rxjs/operators';
import { CoreService } from './../services/core.service';
import { LocationDetail } from './../models/location-detail.model';
import { Company } from './../models/company.model';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  company: Company[];

  location: LocationDetail;
  showCompanies = false;

  constructor(
    private service: CoreService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  getLocation(event) {
    this.location = event;
    this.showCompanies = true;
    this.getCopmanies();
  }

  getCopmanies() {
    this.service.generalGetData(
      'company/?lat=' + this.location.lattitude +
      '&lng=' + this.location.longitude
    ).pipe(take(1)).subscribe((res: any) => {
      this.ngZone.run(_ => {
        this.company = res;
      });
    });
  }

  onSelectCompany(i) {
    this.router.navigate(['/company', this.company[i].id]);
  }

}
