import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { ToolsComponent } from './pages/tools/tools.component';
import { StaffComponent } from './pages/staff/staff.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToolsComponent,
    StaffComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,

    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite Web Components
})
export class MastersModule { }
