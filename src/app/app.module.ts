import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaticHeaderComponent } from './static-header/static-header.component';
import { StaticFooterComponent } from './static-footer/static-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticHeaderComponent,
    StaticFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
