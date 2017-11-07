import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {DataService} from "../shared/services/api/data.service";
import {ProjectLocation} from "../shared/model/project-location";
import {Classifier} from "../shared/model/classifier";

@Component({
  selector: 'location-popup-app',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})
export class LocationPopupComponent implements OnInit {
  @Input() locations: ProjectLocation[];
  @Input() showPopUp: boolean;
  @Output() closePopUp = new EventEmitter<boolean>();
  countrySelectedValue: number = -1;
  districtSelectedValue: number = -1;
  percent: number;
  countriesList: Classifier[] = [];
  districtsList: Classifier[] = [];

  constructor(@Inject('DataService') private dataService: DataService) {
  }

  exportCountryId(selectedId: number) {
    this.countrySelectedValue = selectedId;
    this.dataService.getDistricts(selectedId).subscribe(
      data => {
        this.districtsList = data
        for (let obj of this.locations) {
          this.districtsList = this.districtsList.filter(sec => sec.id != obj.district.id);
        }
      }
    );
  }

  exportDistrictId(selectedId: number) {
    this.districtSelectedValue = selectedId;
  }

  addLocation() {
    let perc = 0;
    for (let obj of this.locations) {
      if (obj.percent) {
        perc += obj.percent;
      }
    }
    if (perc + this.percent > 100) {
      alert(`Please correct percent it mast be <= ${100 - perc}`);
      return;
    }
    if (this.countrySelectedValue != -1 && this.districtSelectedValue != -1) {
      let classifierCountry = new Classifier(this.countrySelectedValue);
      let classifierDistrict = this.districtSelectedValue === -1 ? new Classifier() : new Classifier(this.districtSelectedValue);
      this.dataService.getCountry(this.countrySelectedValue).subscribe(
        data => {
          classifierCountry.name = data
        }
      );
      this.dataService.getDistrict(this.districtSelectedValue).subscribe(
        data => classifierDistrict.name = data
      );
      this.locations.push(new ProjectLocation(classifierCountry, classifierDistrict, this.percent));
      this.closePopUp.emit(false);
      this.districtsList = [];
      this.percent = undefined;
      this.showPopUp = false;
      this.countrySelectedValue = -1;
      this.districtSelectedValue = -1;
      this.percent = undefined;
    }
  }

  cancel() {
    this.closePopUp.emit(false);
    this.districtsList = [];
    this.showPopUp = false;
    this.countrySelectedValue = -1;
    this.districtSelectedValue = -1;
  }

  districtsListInitByCountryId(id: number) {
    this.dataService.getDistricts(id).subscribe(
      data =>
        this.districtsList = data
    );
  }

  countrieslistInit() {
    this.dataService.getCountries().subscribe(
      data =>
        this.countriesList = data
    );
  }

  ngOnInit() {
    this.countrieslistInit();
  }
}
