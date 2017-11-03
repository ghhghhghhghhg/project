import {Pipe, PipeTransform} from '@angular/core';
import {ProjectService} from "../shared/services/project.service";

@Pipe({
  name: 'appSector'
})
export class SectorNamePipe implements PipeTransform {

  constructor(private projectService: ProjectService){  }

  transform(value: number) {
    let name: string;
    for(let obj of this.projectService.sectorsList){
      if(value == obj.id){
        return obj.name
      }
    }
    return "Not found"
  }
}
