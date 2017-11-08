import {Pipe} from "@angular/core";

@Pipe({
  name: "sort"
})
export class SortPipe {

  /**
   * Sort Arrays of Object who have Classifier field
   * @param {any[]} array
   * @param {string} field
   * @param {boolean} desc
   * @returns {any[]}
   */
  transform(array: any[], field: string, desc: boolean = false): any[] {
    setTimeout(() => {
      array.sort((a: any, b: any) => {
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
