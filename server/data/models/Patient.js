import db from '../db';

export default class Patient {
    constructor(props) {
        this.patientId = props.patientId;
        this.firstName = props.firstName;
        this.surname = props.surname;
        this.identifier = props.identifier;
        this.dob = props.dob;
        this.gender = props.gender;
        this.encounter = props.encounter;
    }

    static getByIdentifier(id) {
        return db.getPatient(id);
    }
    
    static getPatientsOnWard(id) {
        return db.getPatientsOnWard(id);
    }

} 