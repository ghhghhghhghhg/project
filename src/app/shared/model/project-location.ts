import {Classifier} from "./classifier";

export class ProjectLocation {
  constructor(public country: Classifier, public district?: Classifier, public percent?: number) {
  }
}
