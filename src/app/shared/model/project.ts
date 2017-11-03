import {ProjectSector} from "./project-sector";
import {ProjectLocation} from "./project-location";

export class Project {
  id: number;
  code: string;
  title: string;
  description: string;
  implementationStatusId: number = -1;
  sectors: ProjectSector[] = [];
  locations: ProjectLocation[] = [];
  startDate: Date = new Date();
  endDate: Date;
  modifyUser: string;
  modifyDate: Date;
}
