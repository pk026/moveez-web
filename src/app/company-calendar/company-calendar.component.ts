import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CoreService } from 'app/services/core.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-company-calendar',
  templateUrl: './company-calendar.component.html',
  styleUrls: ['./company-calendar.component.css']
})
export class CompanyCalendarComponent implements OnInit {

  company_id: number;
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;


  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  slotBooked = false;

  constructor(
    private service: CoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.company_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getSlots();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (event.id && !this.slotBooked) {
      this.slotBooked = true;
      this.bookSlot(event.id);
    }
  }

  getSlots() {
    if (this.company_id) {
      this.service.generalGetData('slot/?company_id=' + this.company_id)
      .pipe(take(1)).subscribe((res: any) => {
        this.events = res.map((el, i) => {
          const s_date = new Date(el.date + ' ' + el.time);
          const e_date = new Date((Number(s_date.getTime()) + 3600000));
          return {
            id: el.id,
            start: s_date,
            end: e_date,
            title: 'Click to book this Slot',
            color: colors.blue,
          };
        });
      });
    }
  }

  bookSlot(id) {
    const data = {
      id: id,
      company: this.company_id,
      availability: false
    };
    this.service.generalPostData('slot/', data)
    .pipe(take(1)).subscribe((res: any) => {
      this.router.navigate(['/booked-slot', id]);
    });
  }

}
