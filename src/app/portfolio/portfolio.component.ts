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

  constructor(private router: Router, @Inject("DataService") private dataService: DataService) {
  }

  projectsPreview: Project[] = []

  getProjects() {
    this.dataService.getProjects()
      .subscribe(data =>
          this.projectsPreview = data,
        err => {
          console.log(err);
        }
      );
  }

  deleteProject(value: number) {
    this.dataService.deleteProject(value).subscribe(
      data => {
        if (data.success) {
          this.projectsPreview = this.projectsPreview.filter(pr => pr.id != data.id);
        }
      }
    );

  }

  editProject(value: number) {
    this.router.navigate(['/projects', value]);
  }

  redirect() {
    this.router.navigate(['/add-project']);
  }

  ngOnInit() {
    this.getProjects();
  }

}
