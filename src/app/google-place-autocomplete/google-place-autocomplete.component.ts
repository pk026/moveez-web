import { environment } from 'environments/environment';
import { take } from 'rxjs/operators';
import { CoreService } from 'app/services/core.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { LocationDetail } from 'app/models/location-detail.model';

declare let google: any;
// declare let gapi: any;

@Component({
  selector: 'app-google-place-autocomplete',
  templateUrl: './google-place-autocomplete.component.html',
  styleUrls: ['./google-place-autocomplete.component.css']
})
export class GooglePlaceAutocompleteComponent implements OnInit {

  @Input() placeholder = '';
  @Input() selectedLocation: LocationDetail = null;
  @Output() locationDetail = new EventEmitter<LocationDetail>();

  locationName = '';

  @ViewChild('searchLoc') set content(content: ElementRef) {
    const searchLoc = content;
    if (searchLoc) {
      this.getWaypoint(searchLoc.nativeElement, (res: LocationDetail) => {
        this.selectedLocation = res;
        this.locationDetail.emit(res);
      });
    }
  }

  constructor(
    private coreService: CoreService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
    if (this.selectedLocation) {
      this.locationName = this.selectedLocation.name.split(',')[0];
    }
  }

  getWaypoint(el: any, fn) {
    let result;
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(el);
      autocomplete.addListener('place_changed', () => {
        // get the place result
        const place = autocomplete.getPlace();
        result = place.formatted_address;
        const waypoint: LocationDetail = new LocationDetail();
        if (el) {
          this.locationName = place.name.split(',')[0];
          waypoint.name = place.name + ',' + place.formatted_address;
          const concatUrl = place.formatted_address.toLowerCase().replace(/[\s]/g, '').split(',').join('-');
          for (let i = 0; i < place.address_components.length; i++) {
            const addressType = place.address_components[i].types[0];
            switch (addressType) {
              case 'neighborhood':
                waypoint.area = place.address_components[i].long_name ? place.address_components[i].long_name : '';
                break;
              case 'locality':
                waypoint.city = place.address_components[i].long_name ? place.address_components[i].long_name : '';
                break;
              case 'sublocality_level_1':
                waypoint.street = place.address_components[i].long_name ? place.address_components[i].long_name : '';
                break;
              case 'sublocality_level_2':
                waypoint.land_mark = place.address_components[i].long_name ? place.address_components[i].long_name : '';
                break;
              case 'administrative_area_level_1':
                waypoint.state = place.address_components[i].long_name ? place.address_components[i].long_name : '';
                break;
              case 'country':
                waypoint.country = place.address_components[i].long_name ? place.address_components[i].long_name : '';
                break;
              case 'postal_code':
                waypoint.postal_code = place.address_components[i].long_name ? place.address_components[i].long_name : '';
                break;
            }
          }

          if (place.photos) {
            const url = place.photos[0].getUrl({ 'maxWidth': 2048, 'maxHeight': 2048 });
            waypoint.pic_url = url;
          }
          waypoint.place_id = place.place_id;
          waypoint.lattitude = place.geometry.location.lat();
          waypoint.longitude = place.geometry.location.lng();
          waypoint.g_type = place.types;
          fn(waypoint);
        }
      });
    });
  }

}
