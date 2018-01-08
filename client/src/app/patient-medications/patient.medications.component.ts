import { Component, Input } from '@angular/core';
import { Medication } from '../types';

@Component({
  selector: 'patient-medications',
  templateUrl: './patient.medications.component.html'
})
export class PatientMedicationsComponent {
  @Input() medications: Medication[];
  constructor() { }
} 