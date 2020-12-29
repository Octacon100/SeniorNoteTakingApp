import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { DatePipe } from '@angular/common'

import { AppComponent } from './app.component';
import { SeniorsComponent } from './Component/seniors/seniors.component';

@NgModule({
  declarations: [
    AppComponent,
    SeniorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
