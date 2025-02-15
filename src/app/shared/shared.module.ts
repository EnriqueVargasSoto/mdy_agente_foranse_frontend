import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SiderbarComponent } from './components/siderbar/siderbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiderbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SiderbarComponent,
    FooterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite cualquier elemento personalizado
})
export class SharedModule { }
