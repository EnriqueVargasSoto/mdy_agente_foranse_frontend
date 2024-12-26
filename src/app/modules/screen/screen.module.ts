import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ScreenComponent } from './pages/screen/screen.component';
import { ScreenRoutingModule } from './screen-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ScreenComponent
  ],
  imports: [
    CommonModule,
    ScreenRoutingModule,
    FormsModule,


  ],
  providers: [DatePipe]
})
export class ScreenModule { }
