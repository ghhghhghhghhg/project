import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {Classifier} from "../../../../../../Desktop/project/project/src/app/shared/model/classifier";
import {DataService} from "../shared/services/api/data.service";
import {ProjectLocation} from "../shared/model/project-location";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'location-popup-app',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})
export class LocationPopupComponent implements OnInit {
  @Input() group: FormGroup;
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
      date => this.districtsList = date
    );
  }

  exportDistrictId(selectedId: number) {
    this.districtSelectedValue = selectedId;
  }

  addLocation() {
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
