import {Pipe} from "@angular/core";
import {ProjectLocation} from "../shared/model/project-location";

@Pipe({
  name: "pipeSortLocation"
})
export class SortLocationListPipe {
  transform(array: ProjectLocation[], field: string, desc: boolean = false): ProjectLocation[] {
    setTimeout(() => {
      array.sort((a: ProjectLocation, b: ProjectLocation) => {
        if (desc) {
          if (a[field].name > b[field].name) {
            return -1;
          } else if (a[field].name < b[field].name) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a[field].name < b[field].name) {
            return -1;
          } else if (a[field].name > b[field].name) {
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
