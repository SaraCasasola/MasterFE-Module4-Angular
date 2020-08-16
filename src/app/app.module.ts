import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { StaticHeaderComponent } from './components/static-header/static-header.component';
import { StaticFooterComponent } from './components/static-footer/static-footer.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { CrudComponent } from './pages/crud/crud.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticHeaderComponent,
    StaticFooterComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
    GaleriaComponent,
    CrudComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    StorageServiceModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
