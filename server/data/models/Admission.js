import db from '../db';

export default class Admission {
    constructor(props) {
        this.encounterId = props.encounterId;
        this.date = props.date;
        this.consultant = props.consultant;
    }

    static getAdmission(id) {
        return db.getPatientAdmission(id);
    }
} 