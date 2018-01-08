import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { WARD_QUERY, PATIENT_DISCHARGE_SUB } from '../queries';
import { Ward, Patient } from '../types';

@Component({
  selector: 'ward-view',
  templateUrl: './ward.view.component.html'
})
export class WardViewComponent implements OnInit {
  loading: boolean;
  ward: Ward;
  patients: Patient[];
  query: any;
  id: string;

  constructor(private apollo: Apollo, private zone: NgZone, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.query = this.apollo.watchQuery<Ward>({
        query: WARD_QUERY,
        variables: { code: this.id }
      });
      this.query.subscribe(({ data }) => {
        this.zone.run(() => {
          this.loading = data.loading;
          this.ward = data.ward;
          this.patients = data.ward.patients;
        });
      });

      this.setupSubscriptions();
    });
  }

  setupSubscriptions(): any {
    this.query
      .subscribeToMore({
        document: PATIENT_DISCHARGE_SUB,
        variables: { wardCode: this.id },
        updateQuery: (previous: any, { subscriptionData }) => {
          if (!subscriptionData) {
            return;
          }

          const dichargedPatientId = subscriptionData.data.patientDischarged.patientId;
          const filteredPatients = previous.ward.patients.filter(p => p.patientId !== dichargedPatientId);

          return Object.assign({}, previous, {
            ward: {
              patients: filteredPatients
            }
          });
        }
      });
  }
}