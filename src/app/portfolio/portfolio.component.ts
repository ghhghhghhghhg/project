import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Project} from "../shared/model/project";
import {DataService} from "../shared/services/api/data.service";
import {ResponseStatus} from "../shared/model/response-status";

@Component({
  selector: 'sis-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  projectsPreview: Project[] = [];
  sortByField: string = 'code';
  isSortByDESC: boolean = false;
  myDate: Date;

  constructor(private router: Router, @Inject("DataService") private dataService: DataService) {
  }

  /**
   * Initialization projects table
   */
  initProjects() {
    this.dataService.getProjects()
      .subscribe(data =>
          this.projectsPreview = data,
        err => {
          console.log(err);
        }
      );
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
   * Delite project with project ID
   * @param {number} value
   */
  deleteProject(value: number) {
    this.dataService.deleteProject(value).subscribe(
      data => {
        this.alertWarning(data);
        if (data.success) {
          this.projectsPreview = this.projectsPreview.filter(pr => pr.id != data.id);
        }
      }
    );

  }

  /**
   * Edit project with project ID
   * @param {number} value
   */
  editProject(value: number): void {
    this.router.navigate(['/projects', value]);
  }

  /**
   * Navigate with "add-project" page
   */
  redirect(): void {
    this.router.navigate(['/add-project']);
  }

  /**
   * Set sort parameters
   * @param {string} by
   */
  setSortParam(by: string):void{
    if (by == "code") {
      this.sortByField = by;
    } else {
      this.sortByField = "title";
    }
  }

  /**
   * Sort projects by field name ASC
   * @param {string} by
   */
  sortASC(by: string): void {
    this.setSortParam(by);
    this.isSortByDESC = false;
  }

  /**
   * Sort projects by field name DESC
   * @param {string} by
   */
  sortDESC(by: string): void {
    this.setSortParam(by);
    this.isSortByDESC = true;
  }

  /**
   * Clock
   */
  utcTime(): void {
    setInterval(() => {
      this.myDate = new Date();
      if(this.myDate.getHours() == 13 && this.myDate.getMinutes() == 0 && this.myDate.getSeconds() == 0){
        alert("Presentation time ended. It's time for lunch, everyone's pleasant appetite");
      }
    }, 1000);
  }

  ngOnInit() {
    this.initProjects();
    this.utcTime();
  }
}
