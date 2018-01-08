import db from '../db';

export default class Encounter {
    constructor(props) {
        this.encounterId = props.encounterId;
        this.date = props.date;
        this.consultant = props.consultant;
    }

    static getAdmission(ids) {
        return db.getPatientAdmission(ids);
    }
} 