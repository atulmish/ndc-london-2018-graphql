import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { PATIENT_SUMMARY } from '../queries';

import { Patient } from '../types';

@Component({
  selector: 'patient-summary',
  templateUrl: './patient.summary.component.html'
})
export class PatientSummaryComponent implements OnInit {
  patient: Patient;
  loading: boolean;
  id: string;

  constructor(
    private apollo: Apollo, private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.apollo.watchQuery<any>({
        query: PATIENT_SUMMARY,
        variables: { identifer: this.id }
      }).subscribe(({ data }) => {
        this.loading = data.loading;
        this.patient = data.patient;
      });
    });
  }
}