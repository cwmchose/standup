import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module.ts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateTeamComponent } from './pages/create-team/create-team.component';
import { ManageTeamsComponent } from './pages/manage-teams/manage-teams.component';
import { StandupsComponent } from './pages/standups/standups.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CreateTeamComponent,
    ManageTeamsComponent,
    StandupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
