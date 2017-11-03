import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Project} from "../model/project";
import {Classifier} from "../model/classifier";


@Injectable()
export class ProjectService{

  districtsCachStatus: Map<number,boolean> = new Map();
  countriesCachStatus: boolean = false;
  classifiers: Map<string, Map<number,any>> =
    new Map().set("countries", new Map()).set("districts", new Map().set(-1, new Map()));
  countries: Map<number, string> = new Map();
  districts: Map<number, Map<number, string>> = new Map();

  //configs = new Map<string, string>();
  // this.configs.set("key", "value");

  implementationStatusesList: Classifier[];
  sectorsList: Classifier[];
  countriesList: Classifier[];
  districtesList: Classifier[];

  constructor(private http: Http){}

  getPortfolioList(){
    return this.http.get(`app/shared/mock/get-projects-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  postDate(obj: Project){
    const body = JSON.stringify(obj);
    return this.http.post("http://localhost:8080/projects", body, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  putDate(obj: Project){
    const body = JSON.stringify(obj);
    return this.http.put(`http://localhost:8080/projects/${obj.id}`, body, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  deleteData(id:number){
    return this.http.delete(`http://localhost:8080/projects/${id}`)
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  getProjectById(id: number){
    return this.http.get(`app/shared/mock/get-project-byId-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  getImplementationStatusesList(){
    return this.http.get(`./app/shared/mock/get-implementation-statuses-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  getSectorsList(){
    return this.http.get(`app/shared/mock/get-sectors-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  getSectorById(id: number){
    return this.http.get(`app/shared/mock/get-sector-by-id-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .map(data => data.name)
      .catch((error:any) => {return Observable.throw(error)});
  }

  getCountriesList(){
    return this.http.get(`app/shared/mock/get-countryes-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  getDistrictsList(countryId: number){
    return this.http.get(`app/shared/mock/get-districts-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error:any) => {return Observable.throw(error)});
  }

  getDistrictById(id: number){
    return this.http.get(`app/shared/mock/get-district-by-id-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .map(data => data.name)
      .catch((error:any) => {return Observable.throw(error)});
  }

  getCountryById(id: number){
    return this.http.get(`app/shared/mock/get-country-by-id-res.json`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .map(data => data.name)
      .catch((error:any) => {return Observable.throw(error)});
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json;charset=utf-8');
    return headers;
  }

}
