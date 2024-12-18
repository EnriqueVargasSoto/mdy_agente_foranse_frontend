import { Routes } from "@angular/router";

export const CommonLayout_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'maestras',
    loadChildren: () => import('../../modules/masters/masters.module').then(m => m.MastersModule)
  },
  {
    path: 'capturas',
    loadChildren: () => import('../../modules/screen/screen.module').then(m => m.ScreenModule)
  }
];
