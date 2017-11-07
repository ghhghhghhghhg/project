import {Project} from "../../model/project";
import {Classifier} from "../../model/classifier";
import {ResponseStatus} from "../../model/response-status";

export abstract class DataSerializer {
  abstract serializeProject(src: Object): Project;

  abstract deserializeProject(project: Project): Object;

  abstract serializeClassifier(src: Object): Classifier;

  abstract deserializeClassifier(src: Classifier): Object;

  abstract serializeResponseStatus(src: Object): ResponseStatus;
}
