import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { DataComponent } from './dashboard/data/data.component';
import { AboutComponent } from './dashboard/about/about.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { EditProfileComponent } from './dashboard/edit-profile/edit-profile.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { YearSelectComponent } from './dashboard/overview/year-select/year-select.component';
import { CampusSelectComponent } from './dashboard/overview/campus-select/campus-select.component';
import { SearchBarComponent } from './dashboard/data/search-bar/search-bar.component';
import { DataTableComponent } from './dashboard/data/data-table/data-table.component';
import { FormSelectorComponent } from './dashboard/data/form-selector/form-selector.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    OverviewComponent,
    DataComponent,
    AboutComponent,
    ProfileComponent,
    EditProfileComponent,
    PageNotFoundComponent,
    YearSelectComponent,
    CampusSelectComponent,
    SearchBarComponent,
    DataTableComponent,
    FormSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    NgChartsModule,
  ],
  providers: [AdminGuard, UserGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
