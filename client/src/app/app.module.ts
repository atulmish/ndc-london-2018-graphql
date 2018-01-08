import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideClient } from './client';
import { AppComponent } from './app.component';
import { PatientSummaryComponent } from './patient-summary/patient.summary.component';
import { PatientEncountersComponent } from './patient-encounters/patient.encounters.component';
import { PatientMedicationsComponent } from './patient-medications/patient.medications.component';
import { WardViewComponent } from './ward-view/ward.view.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientSummaryComponent,
    WardViewComponent,
    PatientEncountersComponent,
    PatientMedicationsComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule.withClient(provideClient),
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'ward/:id', component: WardViewComponent },
      { path: 'patient/:id', component: PatientSummaryComponent },
      { path: '**', redirectTo: 'ward/l21' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
