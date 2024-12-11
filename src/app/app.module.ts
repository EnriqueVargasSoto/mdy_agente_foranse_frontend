import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    SharedModule,

    //LayoutsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite Web Components
})
export class AppModule { }
