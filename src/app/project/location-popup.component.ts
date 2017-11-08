import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {DataService} from "../shared/services/api/data.service";
import {ProjectLocation} from "../shared/model/project-location";
import {Classifier} from "../shared/model/classifier";

@Component({
  selector: 'sis-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})
export class LocationPopupComponent implements OnInit {

  @Input() locations: ProjectLocation[];
  @Input() showPopUp: boolean;
  @Output() closePopUp = new EventEmitter();
  @Input() countryId: number;
  @Input() percent: number;
  private _districtId: number;
  @Input() isEdited: boolean;
  editedLocation: ProjectLocation = null;
  countriesList: Classifier[] = [];
  districtsList: Classifier[] = [];

  constructor(@Inject('DataService') private dataService: DataService) {
  }

  get districtId(): number {
    return this._districtId;
  }

  /**
   * Set district ID and if location is edited initialize district list by selected country ID
   * @param {number} value
   */
  @Input()
  set districtId(value: number) {
    if (this.isEdited) {
      for (let obj of this.locations) {
        if (obj.district.id == value) {
          this.editedLocation = obj;
        }
      }
      this.initDistricts();
    }
    this._districtId = value;
  }

  /**
   * After country select initialize district list by selected country ID
   * @param {number} value
   */
  initDistricts(): void {
    this.dataService.getDistricts(this.countryId).subscribe(
      data => {
        this.districtsList = data;
        for (let obj of this.locations) {
          if (this.isEdited && obj.district.id == this.editedLocation.district.id) {
            continue;
          }
          this.districtsList = this.districtsList.filter(district => district.id != obj.district.id);
        }
      }
    );
  }

  /**
   * After change country ID reinitialize districts list
   * @param {number} selectedId
   */
  changeCountryId(selectedId: number): void {
    this.countryId = selectedId;
    this._districtId = -1;
    this.initDistricts();
  }

  /**
   * After select district set ditrictId selected ID
   * @param {number} selectedId
   */
  changeDistrictId(selectedId: number): void {
    this._districtId = selectedId;
  }

  /**
   * If inserted values is valid add new location or if edited change edit location
   */
  addLocation(): void {
    if (!this.isValid()) {
      return;
    }
    //TODO in combo-box change Id to classifier
    let classifierCountry = new Classifier(this.countryId);
    let classifierDistrict = new Classifier(this.districtId);
    this.dataService.getCountry(this.countryId).subscribe(
      data => {
        classifierCountry.name = data
      }
    );
    this.dataService.getDistrict(this.districtId).subscribe(
      data => classifierDistrict.name = data
    );

    if (this.isEdited) {
      this.editedLocation.percent = this.percent;
      this.editedLocation.country = classifierCountry;
      this.editedLocation.district = classifierDistrict;
    } else {
      this.locations.push(new ProjectLocation(classifierCountry, classifierDistrict, this.percent));
    }
    this.resetPopup();
  }

  /**
   * Return inserted values is valid
   * @returns {boolean}
   */
  isValid(): boolean {
    return this.isValidPercent() && this.countryId != -1 && this.districtId != -1;
  }

  /**
   * Return inserted percent value is valid
   * @returns {boolean}
   */
  isValidPercent(): boolean {
    let perc = this.isEdited ? this.editedLocation.percent ? -this.editedLocation.percent : 0 : 0;
    for (let obj of this.locations) {
      if (obj.percent) {
        perc += obj.percent;
      }
    }
    if (this.percent && perc + this.percent > 100) {
      alert(`Please correct percent it mast be <= ${100 - perc}`);
      return false;
    }
    return true;
  }

  /**
   * Reset popup values
   */
  resetPopup(): void {
    this.closePopUp.emit();
    this.countryId = -1;
    this._districtId = -1;
    this.districtsList = [];
    this.showPopUp = false;
    this.isEdited = false;
  }

  /**
   * Close popup and reset values
   */
  cancel(): void {
    this.resetPopup();
  }

  /**
   * Initialize countries list
   */
  countrieslistInit(): void {
    this.dataService.getCountries().subscribe(
      data =>
        this.countriesList = data
    );
  }

  ngOnInit() {
    this.countrieslistInit();
  }
}
