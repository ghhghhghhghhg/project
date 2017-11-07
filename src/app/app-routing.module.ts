import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectComponent} from "./project/project.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";

const routes: Routes = [
  {path: '', redirectTo: '/projects', pathMatch: 'full'},
  {path: 'add-project', component: ProjectComponent},
  {path: 'projects', component: PortfolioComponent},
  {path: 'projects/:id', component: ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
