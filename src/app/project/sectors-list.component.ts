import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectSector} from "../shared/model/project-sector";

@Component({
  selector: "sis-sectors-list",
  templateUrl: "./sectors-list.component.html",
  styleUrls: ["./sectors-list.component.css"]
})
export class SectorsListComponent {

  isSortSectorListByDESC: boolean = false;
  @Input() sectors: ProjectSector[] = [];
  @Output() deletedSector = new EventEmitter<ProjectSector>();

  /**
   * Delete sector
   * @param {ProjectSector} projectSector
   */
  deleteSector(projectSector: ProjectSector): void {
    this.deletedSector.emit(projectSector);
  }

  /**
   * Sort sectors by sector name ASC
   * @constructor
   */
  SortASC(): void {
    this.isSortSectorListByDESC = false;
  }

  /**
   * Sort sectors by sector name DESC
   * @constructor
   */
  SortDESC(): void {
    this.isSortSectorListByDESC = true;
  }

}
