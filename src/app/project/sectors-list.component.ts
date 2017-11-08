import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectSector} from "../shared/model/project-sector";

@Component({
  selector: "sectors-list-app",
  templateUrl: "./sectors-list.component.html",
  styleUrls: ["./sectors-list.component.css"]
})
export class SectorsListComponent{

  isSortSectorListByDESC: boolean = false;
  @Input() sectors: ProjectSector[] = [];
  @Output() deletedSector = new EventEmitter<ProjectSector>();

  /**
   * Delete sector
   * @param {ProjectSector} projectSector
   */
  deleteSector(projectSector: ProjectSector){
    this.deletedSector.emit(projectSector);
  }

  /**
   * Sort sectors by sector name ASC
   * @constructor
   */
  SortASC(){
    this.isSortSectorListByDESC = false;
  }

  /**
   * Sort sectors by sector name DESC
   * @constructor
   */
  SortDESC(){
    this.isSortSectorListByDESC = true;
  }

}
