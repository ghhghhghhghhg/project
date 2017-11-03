import {Component, Inject, OnInit} from '@angular/core';
import {ProjectService} from "../shared/services/project.service";
import {Router} from "@angular/router";
import {Project} from "../shared/model/project";
import {DataService} from "../shared/services/api/data.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {

  message: string;

  constructor(private router: Router, private projectService: ProjectService, @Inject("DataService") private dataService: DataService) { }

  projectsPreview: Project[] = []

  getProjects(){
    this.dataService.getProjects()
      .subscribe(data =>
        this.projectsPreview = data,
      err => {
        console.log(err);
      }
    );
  }

  deleteProject(value: number){
    this.dataService.deleteProject(value).subscribe();

  }

  editProject(value: number){
    this.router.navigate(['/projects', value]);
  }

  redirect(){
    this.router.navigate(['/add-project']);
  }

  ngOnInit(){
    this.getProjects();
  }

}
