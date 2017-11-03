import {Observable} from "rxjs/Observable";
import {Project} from "../../model/project";
import {Classifier} from "../../model/classifier";
import {ResponseStatus} from "../../model/response-status";

export abstract class DataService{
  abstract getProjects(): Observable<Array<Project>>;
  abstract getProject(id:number): Observable<Project>;
  abstract getImplementationStatuses(): Observable<Array<Classifier>>;
  abstract getSectors(): Observable<Array<Classifier>>;
  abstract getSector(id:number): Observable<string>;

  abstract getCountries(): Observable<Array<Classifier>>;
  abstract getCountry(id: number): Observable<string>;
  abstract getDistricts(countryId: number): Observable<Array<Classifier>>;
  abstract getDistrict(districtId: number): Observable<string>;

  abstract deleteProject(id: number): Observable<ResponseStatus>;
  abstract putProject(project: Project): Observable<ResponseStatus>;
  abstract postProject(project: Project): Observable<ResponseStatus>;

}
