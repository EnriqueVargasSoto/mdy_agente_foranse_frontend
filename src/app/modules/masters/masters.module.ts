import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { ToolsComponent } from './pages/tools/tools.component';
import { StaffComponent } from './pages/staff/staff.component';


@NgModule({
  declarations: [
    ToolsComponent,
    StaffComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite Web Components
})
export class MastersModule { }
