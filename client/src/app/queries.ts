import gql from 'graphql-tag';

const PATIENT_FRAGMENT = gql`
fragment PatientFragment on Patient{
  patientId
  firstName
  surname
  birthDate
  identifier
  gender
}`;

export const WARD_QUERY = gql`
  query ward($code:String!){
    ward(code:$code){
      wardId
      name
      code
      patients {
       ...PatientFragment
        admission{
          encounterId
          date
          consultant
        }
      }
    }
  }${PATIENT_FRAGMENT}`;


export const PATIENT_DISCHARGE_SUB = gql`
  subscription onPatientDischarge($wardCode:String!){
      patientDischarged(wardCode:$wardCode){
          encounterId   
          patientId       
        }
      }
    `;

export const PATIENT_SUMMARY = gql`
  query patient($identifer:String!){
    patient(identifier: $identifer) {
      ...PatientFragment
      medications(limit:5){
        dose
        drugName
        prescribedOn
      }
      admission{
        date
        consultant
      }
    }
}${PATIENT_FRAGMENT}`;
