import { Routes } from "@angular/router";
import { MastersModule } from "../../modules/masters/masters.module";

export const FullLayout_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../../modules/auth/auth.module').then(m => m.AuthModule)
  }
];
