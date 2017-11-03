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
    project.startDate = new Date(src["startDate"]);
    project.endDate = new Date(src["endDate"]);
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
    return undefined;
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
