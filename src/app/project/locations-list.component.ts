import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectLocation} from "../shared/model/project-location";

@Component({
  selector: 'sis-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent {

  sortField: string = "country";
  isSortSectorListByDESC: boolean = false;
  @Input() locations: ProjectLocation[];
  @Output() deletedLocation = new EventEmitter<ProjectLocation>();
  @Output() editedLocation = new EventEmitter<ProjectLocation>();

  /**
   * Delete location
   * @param {ProjectLocation} obj
   */
  deleteLocation(obj: ProjectLocation): void {
    this.deletedLocation.emit(obj);
  }

  /**
   * Edit location
   * @param {ProjectLocation} obj
   */
  editLocation(obj: ProjectLocation): void {
    this.editedLocation.emit(obj);
  }

  /**
   * Sort location by country or district name ASC
   * @param {string} by
   */
  sortASC(by: string): void {
    if (by == "country") {
      this.sortField = by;
    } else {
      this.sortField = "district";
    }
    this.isSortSectorListByDESC = false;
  }

  /**
   * Sort location by country or district name DESC
   * @param {string} by
   */
  sortDESC(by: string): void {
    if (by == "country") {
      this.sortField = by;
    } else {
      this.sortField = "district";
    }
    this.isSortSectorListByDESC = true;
  }
}
