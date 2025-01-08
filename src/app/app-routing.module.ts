import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { MastersModule } from './modules/masters/masters.module';
import { FullLayout_ROUTES } from './shared/routes/full-layout.routes';
import { CommonLayout_ROUTES } from './shared/routes/common-layout.routes';
import { authGuard } from './guard/auth.guard';
import { publicGuard } from './guard/public.guard';

const routes: Routes = [
  { path: '', redirectTo: '/capturas', pathMatch: 'full' }, // Redirección inicial opcional

  {
    path: '',
    component: AuthLayoutComponent,
    children: FullLayout_ROUTES,
    canActivate: [publicGuard]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children:CommonLayout_ROUTES,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
