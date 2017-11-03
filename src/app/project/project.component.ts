import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../shared/services/project.service";
import {Classifier} from "../shared/model/classifier";
import {Project} from "../shared/model/project";
import {DataService} from "../shared/services/api/data.service";
import {ProjectSector} from "../shared/model/project-sector";

@Component({
  selector: 'project-app',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  implementationStatusesList: Classifier[] = [];
  sectorsList: Classifier[] = [];
  selId: number;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, @Inject('DataService') private dataService: DataService, private router: Router) {
  }

  sub: any;

  info: string = 'Create new project';

  showPopUp: boolean = false;

  redirectUrl: string = '/projects';

  selectedSectorValue: number = -1;

  project: Project;


  addSector(per: number) {
    let classifier = new Classifier(this.selId);
    this.dataService.getSector(this.selId).subscribe(
      data => classifier.name = data
    )
    this.project.sectors.push(new ProjectSector(classifier, per))
  }

  openPopUp() {
    this.showPopUp = true;
  }

  closePopUp(showPopUp: boolean) {
    this.showPopUp = false;
  }

  getProjectById(value: number) {
    this.dataService.getProject(value).subscribe(
      data => {
        this.project = data;
        if (this.project.sectors) {
          for (let obj of this.project.sectors) {
            this.dataService.getSector(obj.sector.id).subscribe(
              data => obj.sector.name = data
            )
          }
        }
        if (this.project.locations) {
          for (let obj of this.project.locations) {
            this.dataService.getCountry(obj.country.id).subscribe(
              data => obj.country.name = data
            )
            this.dataService.getDistrict(obj.district.id).subscribe(
              data => obj.district.name = data
            )
          }
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  getImplementationStatusesList() {
    this.dataService.getImplementationStatuses().subscribe(
      data => {
        this.implementationStatusesList = data;
      }
    );
  }

  getSectorsList() {
    this.projectService.getSectorsList().subscribe(
      data => {
        this.sectorsList = data;
      }
    );
  }

  projectEvent(value: number) {
    if (value === 1) {
      {
        if (this.project.id) {
          this.dataService.putProject(this.project).subscribe()
        } else {
          this.dataService.postProject(this.project).subscribe(
            data => {
              this.project.id = data.id
            }
          )
        }
      }
    }
    if (value === 2) {
      if (this.project.id) {
        this.dataService.putProject(this.project).subscribe()
      } else {
        this.dataService.postProject(this.project).subscribe()
      }
      this.redirect();
    }
    if (value === 3) {
      this.redirect();
    }
  }

  selectedId(value: number) {
    this.selId = value;
  }

  redirect() {
    this.router.navigate([this.redirectUrl]);
  }

  ngOnInit() {

    this.getImplementationStatusesList();
    this.getSectorsList();
    this.sub = this.route.params.subscribe(params => {
      if (+params['id']) {
        this.getProjectById(+params['id']);
      } else {
        this.project = new Project();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
