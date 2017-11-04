import {DataService} from "./api/data.service";
import {Observable} from "rxjs/Observable";
import {Project} from "../model/project";
import {Classifier} from "../model/classifier";
import {DataSerializer} from "./api/data.serializer";
import {Http, Headers, Response} from "@angular/http";
import {Inject, Injectable} from "@angular/core";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ResponseStatus} from "../model/response-status";

@Injectable()
export class DataServiceImpl implements DataService {

  constructor(@Inject('DataSerializer') private serializer: DataSerializer, private http: Http) {
  }

  getProjects(): Observable<Array<Project>> {
    return this.http.get(`http://localhost:8080/projects`, {headers: this.getHeaders()})
      .map((resp: Response) => {
        let projects: Project[] = [];
        for (let obj of resp.json()) {
          projects.push(this.serializer.serializeProject(obj));
        }
        return projects;
      })
      .catch((error: any) => {
        return Observable.throw(error)
      });
  }

  getProject(id: number): Observable<Project> {
    return this.http.get(`http://localhost:8080/projects/${id}`, {headers: this.getHeaders()})
      .map((resp: Response) => this.serializer.serializeProject(resp.json()))
      .catch((error: any) => {
        return Observable.throw(error)
      });
  }

  getImplementationStatuses(): Observable<Array<Classifier>> {
    return this.http.get(`http://localhost:8080/implimentation-statuses`, {headers: this.getHeaders()})
      .map((resp: Response) => {
        let classifiers: Classifier[] = [];
        for (let obj of resp.json()) {
          classifiers.push(this.serializer.serializeClassifier(obj));
        }
        return classifiers;
      })
      .catch((error: any) => {
        return Observable.throw(error)
      });
  }

  getSectors(): Observable<Array<Classifier>> {
    return this.http.get(`http://localhost:8080/sectors`, {headers: this.getHeaders()})
      .map((resp: Response) => {
        let classifiers: Classifier[] = [];
        for (let obj of resp.json()) {
          classifiers.push(this.serializer.serializeClassifier(obj));
        }
        return classifiers;
      })
      .catch((error: any) => {
        return Observable.throw(error)
      });
  }

  getSector(id:number): Observable<string> {
    return this.http.get(`http://localhost:8080/sectors/${id}`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json().name)
      .catch((error:any) => {return Observable.throw(error)});
  }

  getCountries(): Observable<Array<Classifier>> {
    return this.http.get(`http://localhost:8080/countries`, {headers: this.getHeaders()})
      .map((resp: Response) => {
        let classifiers: Classifier[] = [];
        for (let obj of resp.json()) {
          classifiers.push(this.serializer.serializeClassifier(obj));
        }
        return classifiers;
      })
      .catch((error: any) => {
        return Observable.throw(error)
      });
  }

  getCountry(id: number): Observable<string> {
    return this.http.get(`http://localhost:8080/countries/${id}`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json().name)
      .catch((error: any) => {
        return Observable.throw(error)
      });
  }

  getDistricts(countryId: number): Observable<Array<Classifier>> {
    return this.http.get(`http://localhost:8080/districts-by-country/${countryId}`, {headers: this.getHeaders()})
      .map((resp: Response) => {
        let classifiers: Classifier[] = [];
        for (let obj of resp.json()) {
          classifiers.push(this.serializer.serializeClassifier(obj));
        }
        return classifiers;
      })
      .catch((error: any) => {
        return Observable.throw(error)
      });
  }

  getDistrict(districtId: number): Observable<string> {
    return this.http.get(`http://localhost:8080/districts/${districtId}`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json().name)
      .catch((error: any) => {
        return Observable.throw(error)
      });
  }

  deleteProject(id: number): Observable<ResponseStatus> {
    return this.http.delete(`http://localhost:8080/projects/${id}`, {headers: this.getHeaders()})
      .map((resp: Response) => this.serializer.serializeResponseStatus(resp.json()))
      .catch((error:any) => {return Observable.throw(error)});
  }

  putProject(project: Project): Observable<ResponseStatus> {
    const body = this.serializer.deserializeProject(project);
    return this.http.put(`http://localhost:8080/projects`, body, {headers: this.getHeaders()})
      .map((resp: Response) => this.serializer.serializeResponseStatus(resp.json()))
      .catch((error:any) => {return Observable.throw(error)});
  }

  postProject(project: Project): Observable<ResponseStatus> {
    const body = this.serializer.deserializeProject(project);
    return this.http.post("http://localhost:8080/projects", body, {headers: this.getHeaders()})
      .map((resp: Response) => this.serializer.serializeResponseStatus(resp.json()))
      .catch((error:any) => {return Observable.throw(error)});
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json;charset=utf-8');
    return headers;
  }
}
