import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Classifier} from "../shared/model/classifier";
import {Project} from "../shared/model/project";
import {DataService} from "../shared/services/api/data.service";
import {ProjectSector} from "../shared/model/project-sector";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectLocation} from "../shared/model/project-location";
import {ResponseStatus} from "../shared/model/response-status";

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
  isEditedLocation: boolean = false;
  redirectUrl: string = '/projects';
  project: Project;

  /**
   * Add sector if inserted values is valid
   */
  addSector(): void {
    if (!this.isValid()) {
      return;
    }
    let classifier = new Classifier(this.sectorSelectedId);
    this.dataService.getSector(this.sectorSelectedId).subscribe(
      data => classifier.name = data
    );
    this.project.sectors.push(new ProjectSector(classifier, this.sectorPercent));
    this.sectorsList = this.sectorsList.filter(sectorSelected => sectorSelected.id != this.sectorSelectedId);
    this.sectorSelectedId = -1;
    this.sectorPercent = undefined;
  }

  /**
   * Checked inserted sector values
   * @returns {boolean}
   */
  isValid(): boolean {
    return this.isValidPercent() && this.sectorSelectedId != -1
  }

  /**
   * Cheked inserted sector perscent
   * @returns {boolean}
   */
  isValidPercent(): boolean {
    let perc = 0;
    for (let obj of this.project.sectors) {
      if (obj.percent) {
        perc += obj.percent;
      }
    }
    if (perc + this.sectorPercent > 100) {
      alert(`Please correct sector percent it mast be <= ${100 - perc}`);
      return false;
    }
    return true;
  }

  /**
   * Open popup
   */
  openPopUp(): void {
    this.showPopUp = true;
    this.isEditedLocation = false;
  }

  /**
   * Close popup
   */
  closePopUp(): void {
    this.showPopUp = false;
    this.countryid = -1;
    this.districtId = -1;
    this.locationPercent = null;
    this.isEditedLocation = false;
  }

  /**
   * Get edited project date
   * @param {number} value
   */
  initProjectById(value: number): void {
    this.dataService.getProject(value).subscribe(
      data => {
        this.project = data;
        this.info = `Edited project by ID:${this.project.id}`;
        this.initProjectSectorsName();
        this.initLocationsCountriesAndDistrictsName();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  /**
   * Initialize sectors name
   */
  initProjectSectorsName(): void {
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
  }

  /**
   * Initialize countries and districts name
   */
  initLocationsCountriesAndDistrictsName(): void {
    if (this.project.locations) {
      for (let obj of this.project.locations) {
        this.dataService.getCountry(obj.country.id).subscribe(
          data => obj.country.name = data
        );
        this.dataService.getDistrict(obj.district.id).subscribe(
          data => obj.district.name = data
        )
      }
    }
  }

  /**
   * Initialize implementation statuses list
   */
  initImplementationStatusesList(): void {
    this.dataService.getImplementationStatuses().subscribe(
      data => {
        this.implementationStatusesList = data;
      }
    );
  }

  /**
   * Initialize sectors list
   */
  initSectorsList(): void {
    this.dataService.getSectors().subscribe(
      data => {
        this.sectorsList = data;
      }
    );
  }

  /**
   * Generate modify information
   */
  genModifyInformation() {
    this.project.modifyDate = new Date();
    this.project.modifyUser = "User";
  }

  /**
   * Alert message if response success false
   * @param data
   */
  alertWarning(data: ResponseStatus):void{
    if(!data.success){
      alert(data.message);
    }
  }

  /**
   * Save project
   */
  saveProject(): void {
    this.genModifyInformation();
    if (this.project.id) {
      this.dataService.putProject(this.project).subscribe(
        data => this.alertWarning(data)
      )
    } else {
      this.dataService.postProject(this.project).subscribe(
        data => {
          this.alertWarning(data);
          this.project.id = data.id;
        }
      )
    }
  }

  /**
   * Save project and navigate to portfolio page
   */
  saveAndCloseProject(): void {
    this.genModifyInformation();
    if (this.project.id) {
      this.dataService.putProject(this.project).subscribe(
        data => {
          this.alertWarning(data);
          if (data.success) {
            this.redirect();
          }
        }
      )
    } else {
      this.dataService.postProject(this.project).subscribe(
        data => {
          this.alertWarning(data);
          if (data.success) {
            this.redirect();
          }
        }
      )
    }
  }

  /**
   * Cancel
   */
  cancel(): void {
    this.redirect();
  }

  /**
   * Set sector selected ID
   * @param {number} value
   */
  selectedId(value: number): void {
    this.sectorSelectedId = value;
  }

  /**
   * Navigate to portfolio page
   */
  redirect(): void {
    this.router.navigate([this.redirectUrl]);
  }

  /**
   * Set implimentation status selected ID
   * @param {number} value
   */
  implStatuseSelectedId(value: number): void {
    this.project.implementationStatusId = value;
  }

  /**
   * Add sector list sector and remove sector with sectors
   * @param {ProjectSector} obj
   */
  restoreSector(obj: ProjectSector): void {
    this.sectorsList.push(obj.sector);
    this.project.sectors = this.project.sectors.filter(o => o.sector.id != obj.sector.id);
  }

  /**
   * Remove location with locations
   * @param {ProjectSector} obj
   */
  restoreLocation(obj: ProjectLocation): void {
    this.project.locations = this.project.locations.filter(o => o.district.id != obj.district.id);
  }

  /**
   * Open popup and set selected country, district, percent values
   * @param {ProjectLocation} obj
   */
  editLocation(obj: ProjectLocation): void {
    this.countryid = obj.country.id;
    this.districtId = obj.district.id;
    this.locationPercent = obj.percent;
    this.showPopUp = true;
    this.isEditedLocation = true;
  }

  /**
   * Initialize formgroup variable
   */
  initForm(): void {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required)
    });
  }

  /**
   * Check addable or editable status
   */
  checkNavigateStatus(): void {
    this.route.params.subscribe(params => {
      if (+params['id']) {
        this.initProjectById(+params['id']);
      } else {
        this.info = 'Create new project';
        this.project = new Project();
      }
    });
  }

  ngOnInit() {
    this.initForm();
    this.initImplementationStatusesList();
    this.initSectorsList();
    this.checkNavigateStatus();
  }
}
