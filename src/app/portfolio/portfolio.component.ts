import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Project} from "../shared/model/project";
import {DataService} from "../shared/services/api/data.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  projectsPreview: Project[] = [];

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
   * Delite project with project ID
   * @param {number} value
   */
  deleteProject(value: number) {
    this.dataService.deleteProject(value).subscribe(
      data => {
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
  editProject(value: number) {
    this.router.navigate(['/projects', value]);
  }

  /**
   * Redirect with "add-project" page
   */
  redirect() {
    this.router.navigate(['/add-project']);
  }

  ngOnInit() {
    this.initProjects();
  }
}
