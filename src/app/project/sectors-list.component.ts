import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectService} from "../shared/services/project.service";
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

  deleteSector(projectSector: ProjectSector){
    this.deletedSector.emit(projectSector);
  }

  SortASC(){
    this.isSortSectorListByDESC = false;
  }

  SortDESC(){
    this.isSortSectorListByDESC = true;
  }

}
