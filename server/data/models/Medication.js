import db from '../db';

export default class Medication {
    constructor(props) {
        this.patientId = props.patientId;
        this.drugName = props.drugName;
        this.dose = props.surname;
        this.prescribedOn = props.prescribedOn;
    }

    static getByPatientIdentifier(id, limit) {
        return db.getPatientMedications(id, limit);
    }
} 