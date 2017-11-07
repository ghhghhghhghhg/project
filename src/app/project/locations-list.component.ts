import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectLocation} from "../shared/model/project-location";

@Component({
  selector: 'locations-list-app',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent {

  sortField: string = "country";
  isSortSectorListByDESC: boolean = false;

  @Input() locations: ProjectLocation[];
  @Output() deletedLocation = new EventEmitter<ProjectLocation>();
  @Output() editedLocation = new EventEmitter<ProjectLocation>();

  deleteLocation(obj: ProjectLocation) {
    this.deletedLocation.emit(obj);
  }

  editLocation(obj: ProjectLocation){
    this.editedLocation.emit(obj);
  }

  sortASC(by: string) {
    if (by == "country") {
      this.sortField = by;
    } else {
      this.sortField = "district";
    }
    this.isSortSectorListByDESC = false;
  }

  sortDESC(by: string) {
    if (by == "country") {
      this.sortField = by;
    } else {
      this.sortField = "district";
    }
    this.isSortSectorListByDESC = true;
  }
}
