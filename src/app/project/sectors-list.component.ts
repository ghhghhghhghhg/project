import {Component, Input, OnInit} from "@angular/core";
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

  constructor(private projectService: ProjectService){  }

  SortASC(){
    this.isSortSectorListByDESC = false;
  }

  SortDESC(){
    this.isSortSectorListByDESC = true;
  }

  deleteProjectSector(id: number){
    this.sectors = this.sectors.filter(obj => obj.sector.id != id)
}

}
