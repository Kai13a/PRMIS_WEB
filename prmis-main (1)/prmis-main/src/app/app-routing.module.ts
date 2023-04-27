import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { EditProfileComponent } from './dashboard/edit-profile/edit-profile.component';
import { DataComponent } from './dashboard/data/data.component';
import { AboutComponent } from './dashboard/about/about.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/overview', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'data',
        canActivate: [AdminGuard],
        component: DataComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'editProfile',
        canActivate: [UserGuard],
        component: EditProfileComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
