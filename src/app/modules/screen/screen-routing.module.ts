import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenComponent } from './pages/screen/screen.component';

const routes: Routes = [
  {
    path: '',
    component: ScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenRoutingModule { }
