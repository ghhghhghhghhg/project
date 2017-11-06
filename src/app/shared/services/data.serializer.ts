import {DataSerializer} from "./api/data.serializer";
import {Project} from "../model/project";
import {Classifier} from "../model/classifier";
import {ProjectSector} from "../model/project-sector";
import {ProjectLocation} from "../model/project-location";
import {Injectable} from "@angular/core";
import {ResponseStatus} from "../model/response-status";

@Injectable()
export class DataSerializerImpl implements DataSerializer {

  serializeProject(src: Object): Project {
    let project = new Project();
    project.id = src["id"];
    project.code = src["code"];
    project.title = src["title"];
    project.description = src["description"];
    project.implementationStatusId = src["implementationStatusId"];
    project.startDate = src["startDate"]?new Date(src["startDate"]):null;
    project.endDate = src["endDate"]?new Date(src["endDate"]):null;
    project.modifyUser = src["modifyUser"];
    project.modifyDate = src["modifyDate"];
    if (src["sectors"]) {
      for (let obj of src["sectors"]) {
        project.sectors.push(
          new ProjectSector(new Classifier(obj["id"]), obj["percent"])
        )
      }
    }
    if (src["locations"]) {
      for (let obj of src["locations"]) {
        project.locations.push(
          new ProjectLocation(new Classifier(obj["countryId"]), new Classifier(obj["districtId"]), obj["percent"])
        )
      }
    }
    return project;
  }

  deserializeProject(project: Project): Object {
    let sec: {id: number, percent: number}[];
    let loc: {countryId: number, districtId: number, percent: number}[];
    if(project.sectors){
      sec = [];
      for(let obj of project.sectors){
        sec.push({id: obj.sector.id, percent: obj.percent})
      }
    }
    if(project.locations){
      loc = [];
      for(let obj of project.locations){
        loc.push({countryId: obj.country.id, districtId: obj.district.id, percent: obj.percent})
      }
    }
    let obj = {
      id: project.id,
      code: project.code,
      title: project.title,
      description: project.description,
      implementationStatusId: project.implementationStatusId,
      startDate: project.startDate?project.startDate.getTime():null,
      endDate: project.endDate?project.endDate.getTime():null,
      modifyUser: project.modifyUser,
      modifyDate: project.modifyDate?project.modifyDate.getTime():null,
      sectors: sec,
      locations: loc
    }
     return obj;
  }

  serializeClassifier(src: Object): Classifier {
    return new Classifier(src["id"], src["name"]);
  }

  deserializeClassifier(src: Classifier): Object {
    return {
      "id": src.id,
      "name": src.name
    };
  }


  serializeResponseStatus(src: Object): ResponseStatus {
    let res = new ResponseStatus();
    res.id = src["id"];
    res.message = src["message"];
    res.success = src["success"];
    return res;
  }

}
