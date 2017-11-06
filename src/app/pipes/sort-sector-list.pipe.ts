import {Pipe} from "@angular/core";
import {ProjectSector} from "../shared/model/project-sector";

@Pipe({
  name: "pipeSortSector"
})
export class SortSectorListPipe {
  transform(array: ProjectSector[], desc: boolean = false): ProjectSector[] {
    setTimeout(() => {
      array.sort((a: ProjectSector, b: ProjectSector) => {
        if (desc) {
          if (a.sector.name > b.sector.name) {
            return -1;
          } else if (a.sector.name < b.sector.name) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a.sector.name < b.sector.name) {
            return -1;
          } else if (a.sector.name > b.sector.name) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    });
    return array;
  }
}
