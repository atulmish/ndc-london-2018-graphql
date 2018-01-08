export interface Patient {
  patientId: number;
  firstName: string;
  surname: string;
  birthDate: string;
  gender: string;
  identifier: string;
  medications: Medication[];
  admission: Admission;
}

export interface Admission {
  wardId: number;
  encounterId: number;
  patientId: number;
  encounterType: string;
  date: string;
  consultant: string;
}

export interface Medication {
  patientId: number;
  dose: string;
  name: string;
  prescribedOn: string;
}

export interface Ward {
  wardId: number;
  name: string[];
  code: string[];
  patients: Patient[];
}

export interface PatientDischarged {
  encounterId: number;
}