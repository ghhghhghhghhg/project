import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {Classifier} from "../../../../../../Desktop/project/project/src/app/shared/model/classifier";
import {ProjectService} from "../shared/services/project.service";
import {DataService} from "../shared/services/api/data.service";
import {ProjectLocation} from "../shared/model/project-location";

@Component({
  selector: 'location-popup-app',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})
export class LocationPopupComponent implements OnInit{
  @Input() locations: ProjectLocation[];
  @Input() showPopUp: boolean;
  @Output() closePopUp = new EventEmitter<boolean>();
  countrySelectedValue: number = -1;
  districtSelectedValue: number = -1;
  percent: number;
  countryId: number;
  countriesList: Classifier[] = [];
  districtsList: Classifier[] = [];

  constructor(private projectService: ProjectService, @Inject('DataService') private dataService: DataService){}

  exportCountryId(selectedId:number){
    this.countryId = selectedId;
    this.projectService.getDistrictsList(selectedId).subscribe(
      date => this.districtsList = date
    );
  }

  addLocation(countryValue: number, districtValue: number, per: number){
    let classifierCountry = new Classifier(countryValue);
    let classifierDistrict = new Classifier(districtValue);
    this.dataService.getCountry(countryValue).subscribe(
    data => classifierCountry.name = data
    );
    this.dataService.getDistrict(districtValue).subscribe(
      data => classifierDistrict.name = data
    );
    this.locations.push(new ProjectLocation(classifierCountry, classifierDistrict, per));
  }

  cancel(){
    this.closePopUp.emit(false);
    this.districtsList = [];
    this.showPopUp = false;
  }

  districtsListInitByCountryId(id: number){
    if(!this.projectService.districtsCachStatus.has(id)){
      if(!this.projectService.classifiers.get("districts").has(id)){
        this.projectService.classifiers.get("districts").set(id, new Map())
      }
      this.projectService.getDistrictsList(id).subscribe(
        data => {
          for(let obj of data){
            this.projectService.classifiers.get("districts").get(id).set(obj.id, obj.name);
            let district = new Classifier(obj.id, obj.name);
            this.districtsList.push(district);
          }
          this.projectService.districtsCachStatus.set(id, true);
        }
      );
    }
  }

  countrieslistInit(){
    if(!this.projectService.countriesCachStatus){
      this.projectService.getCountriesList().subscribe(
        data => {
          for(let obj of data){
            this.projectService.classifiers.get("countries").set(obj.id, obj.name);
            let country = new Classifier(obj.id, obj.name);
            this.countriesList.push(country);
          }
          this.projectService.countriesCachStatus = true;
        }
      );
    } else {
      this.projectService.classifiers.get("countries").forEach(
        (value, key) => {
          this.countriesList.push(new Classifier(key, value))
        }
      )
    }
  }

  ngOnInit(){
    this.countrieslistInit();
  }
}
