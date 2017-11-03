import {Pipe, PipeTransform} from '@angular/core';
import {ProjectService} from "../shared/services/project.service";

@Pipe({
  name: 'appDate'
})
export class MillisecondsToDatePipe implements PipeTransform {

  constructor(private projectService: ProjectService){  }

  transform(value: number) {
    let time: Date = new Date(value);
    return time;
  }
}
