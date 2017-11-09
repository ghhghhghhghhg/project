import {Pipe} from "@angular/core";

@Pipe({
  name: "sortByField"
})
export class SortByArrayFieldPipe {

  /**
   * Sort Arrays by field ASC or DESC
   * @param {any[]} array
   * @param {string} field
   * @param {boolean} desc
   * @returns {any[]}
   */
  transform(array: any[], field: string, desc: boolean = false): any[] {
    setTimeout(() => {
      array.sort((a: any, b: any) => {
        if (desc) {
          if (a[field]> b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
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
