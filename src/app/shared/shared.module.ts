import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SiderbarComponent } from './components/siderbar/siderbar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiderbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    SiderbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite cualquier elemento personalizado
})
export class SharedModule { }
