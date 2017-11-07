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
  @Input() countryId: number;
  @Input() countrySelectedValue: number = -1;
  @Input() districtSelectedValue: number = -1;
  @Input() percent: number;
  private _districtId: number;
  isEdited: boolean = false;
  editedLocation: ProjectLocation = null;
  countriesList: Classifier[] = [];
  districtsList: Classifier[] = [];

  get districtId(): number {
    return this._districtId;
  }

  @Input()
  set districtId(value: number) {
    if (value != -1) {
      this.dataService.getDistricts(this.countryId).subscribe(
        data => {
          this.districtsList = data;
          for (let obj of this.locations) {
            if (obj.district.id == value) {
              continue;
            }
            this.districtsList = this.districtsList.filter(sec => sec.id != obj.district.id);
          }
        }
      );
      for(let obj of this.locations){
        if (obj.district.id == value) {
          this.editedLocation = obj;
        }
      }
      this.isEdited = true;
    }
    this._districtId = value;
    this.countrySelectedValue = this.countryId;
    this.districtSelectedValue = this._districtId;
  }

  constructor(@Inject('DataService') private dataService: DataService) {
  }

  exportCountryId(selectedId: number) {
    this.countryId = selectedId;
    this.countrySelectedValue = this.countryId;
    this._districtId = -1;
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
    let perc = this.editedLocation.percent?-this.editedLocation.percent:0;
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
      let classifierDistrict = new Classifier(this.districtSelectedValue);
      this.dataService.getCountry(this.countrySelectedValue).subscribe(
        data => {
          classifierCountry.name = data
        }
      );
      this.dataService.getDistrict(this.districtSelectedValue).subscribe(
        data => classifierDistrict.name = data
      );
      if(this.isEdited) {
        this.editedLocation.percent = this.percent;
        this.editedLocation.country = classifierCountry;
        this.editedLocation.district = classifierDistrict;
      } else {
        this.locations.push(new ProjectLocation(classifierCountry, classifierDistrict, this.percent));
      }
      this.closePopUp.emit(false);
      this.districtsList = [];
      this.percent = undefined;
      this.showPopUp = false;
      this.countrySelectedValue = -1;
      this.districtSelectedValue = -1;
      this.percent = undefined;
      this.isEdited = false;
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
