import {AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit} from "@angular/core";
import {ProjectService} from "../shared/services/project.service";
import {LocationsListItem} from "../shared/model/locationsListItem";
import {ProjectLocation} from "../shared/model/project-location";


interface LocationAndPercent{
  countryId: number;
  districtId: number;
  percent: number;
}

@Component({
  selector: 'locations-list-app',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent{

  sortField: string = "country";
  isSortSectorListByDESC: boolean = false;

  @Input() locations: ProjectLocation[];

  constructor(private projectService: ProjectService){}

  SortASC(by: string){
    if(by == "country"){
      this.sortField = by;
    }else {
      this.sortField = "district";
    }
    this.isSortSectorListByDESC = false;
  }

  SortDESC(by: string){
    if(by == "country"){
      this.sortField = by;
    }else {
      this.sortField = "district";
    }
    this.isSortSectorListByDESC = true;
  }
}
