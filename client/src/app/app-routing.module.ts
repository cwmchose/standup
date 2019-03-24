import { LoginComponent } from './pages/login/login.component';
import { CreateTeamComponent } from './pages/create-team/create-team.component';
import { ShowRecipeComponent } from './pages/manage-teams/maange-teams.component';
import { ManageTeamsComponent } from './pages/manage-teams/manage-teams.component';
import { StandupsComponent } from './pages/standups/standups.component'

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'create-team', component: CreateTeamComponent},
  {path: 'manage-teams', component: ManageTeamsComponent},
  {path: 'standups', component: StandupsComponent},
  {path: '**', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
