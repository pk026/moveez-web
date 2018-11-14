import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/services/core.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slot-booked',
  templateUrl: './slot-booked.component.html',
  styleUrls: ['./slot-booked.component.css']
})
export class SlotBookedComponent implements OnInit {

  slot_id: number;
  slot: any;

  constructor(
    private route: ActivatedRoute,
    private service: CoreService
  ) {
    this.slot_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getBookedSlot();
  }

  getBookedSlot() {
    if (this.slot_id) {
      this.service.generalGetData('slot/' + this.slot_id + '/')
      .pipe(take(1)).subscribe((res: any) => {
        this.slot = res;
      });
    }
  }

}
