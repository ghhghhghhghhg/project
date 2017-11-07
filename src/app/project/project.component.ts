import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Classifier} from "../shared/model/classifier";
import {Project} from "../shared/model/project";
import {DataService} from "../shared/services/api/data.service";
import {ProjectSector} from "../shared/model/project-sector";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectLocation} from "../shared/model/project-location";

@Component({
  selector: 'project-app',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  form: FormGroup;
  implementationStatusesList: Classifier[] = [];
  sectorsList: Classifier[] = [];
  sectorSelectedId: number = -1;
  sectorPercent: number;
  countryid: number = -1;
  districtId: number = -1;
  locationPercent: number;

  constructor(private route: ActivatedRoute, @Inject('DataService') private dataService: DataService, private router: Router) {
  }

  info: string;
  showPopUp: boolean = false;
  redirectUrl: string = '/projects';
  project: Project;

  addSector() {
    let perc = 0;
    for (let obj of this.project.sectors) {
      if (obj.percent) {
        perc += obj.percent;
      }
    }
    if (perc + this.sectorPercent > 100) {
      alert(`Please correct sector percent it mast be <= ${100 - perc}`);
      return;
    }
    if (this.sectorSelectedId !== -1) {
      let classifier = new Classifier(this.sectorSelectedId);
      this.dataService.getSector(this.sectorSelectedId).subscribe(
        data => classifier.name = data
      )
      this.project.sectors.push(new ProjectSector(classifier, this.sectorPercent));
      this.sectorsList = this.sectorsList.filter(sec => sec.id != this.sectorSelectedId);
      this.sectorSelectedId = -1;
      this.sectorPercent = undefined;
    }
  }

  openPopUp() {
    this.showPopUp = true;
  }

  closePopUp(showPopUp: boolean) {
    this.showPopUp = false;
    this.countryid = -1;
    this.districtId = -1;
    this.locationPercent = null;
  }

  getProjectById(value: number) {
    this.dataService.getProject(value).subscribe(
      data => {
        this.project = data;
        this.info = `Edited project by ID:${this.project.id}`;
        if (this.project.sectors) {
          for (let obj of this.project.sectors) {
            this.dataService.getSector(obj.sector.id).subscribe(
              data => {
                obj.sector.name = data;
                this.sectorsList = this.sectorsList.filter(sec => sec.name != data);
              }
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
    this.dataService.getSectors().subscribe(
      data => {
        this.sectorsList = data;
      }
    );
  }

  projectEvent(value: number) {
    if (value == 1) {
      let date: Date = new Date();
      this.project.modifyDate = date;
      this.project.modifyUser = "User"
      if (this.project.id) {
        this.dataService.putProject(this.project).subscribe()
      } else {
        this.dataService.postProject(this.project).subscribe(
          data => {
            this.project.id = data.id;
          }
        )
      }
    }
    if (value == 2) {
      let date: Date = new Date();
      this.project.modifyDate = date;
      this.project.modifyUser = "User"
      if (this.project.id) {
        this.dataService.putProject(this.project).subscribe(
          data => {
            if (data.success) {
              this.redirect();
            }
          }
        )
      } else {
        this.dataService.postProject(this.project).subscribe(
          data => {
            if (data.success) {
              this.redirect();
            }
          }
        )
      }
    }
    if (value == 3) {
      this.redirect();
    }
  }

  selectedId(value: number) {
    this.sectorSelectedId = value;
  }

  redirect() {
    this.router.navigate([this.redirectUrl]);
  }

  implStatuseSelectedId(value: number) {
    this.project.implementationStatusId = value;
  }

  restoreSector(obj: ProjectSector) {
    this.sectorsList.push(obj.sector);
    this.project.sectors = this.project.sectors.filter(o => o.sector.id != obj.sector.id);
  }

  restoreLocation(obj: ProjectLocation){
    this.project.locations = this.project.locations.filter(o => o.district.id != obj.district.id);
  }

  editLocation(obj: ProjectLocation){
    this.countryid = obj.country.id;
    this.districtId = obj.district.id;
    this.locationPercent = obj.percent;
    this.showPopUp = true;
  }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required)
    });
    this.getImplementationStatusesList();
    this.getSectorsList();
    this.route.params.subscribe(params => {
      if (+params['id']) {
        this.getProjectById(+params['id']);
      } else {
        this.info = 'Create new project';
        this.project = new Project();
      }
    });
  }
}
