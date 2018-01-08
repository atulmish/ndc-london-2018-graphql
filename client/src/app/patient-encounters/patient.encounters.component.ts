import { Component, Input } from '@angular/core';
import { Admission } from '../types';

@Component({
  selector: 'patient-encounters',
  templateUrl: './patient.encounters.component.html'
})
export class PatientEncountersComponent {
  @Input() encounter: Admission;
  constructor() { }
}