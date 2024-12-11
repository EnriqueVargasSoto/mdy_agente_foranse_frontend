import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsComponent } from './pages/tools/tools.component';
import { StaffComponent } from './pages/staff/staff.component';

const routes: Routes = [
  {
    path: 'tools',
    component: ToolsComponent
  },
  {
    path: 'staff',
    component: StaffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
