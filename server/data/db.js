import db from 'sqlite';
import _ from 'lodash';

const parameterize = params => asArray(params).map(param => param).join();
const asArray = a => Array.isArray(a) ? a : [a];

const getWard = id => db.get(`SELECT * FROM Ward WHERE LOWER(code) = ?`, id);

const getPatientsOnWard = id => db.all(`SELECT * FROM PatientsOnWard_View WHERE wardId = ?`, id);

const getPatient = id => db.get(`SELECT * FROM Patient WHERE identifier = ?`, id);

const getPatientAdmission = (id) =>  db.get(`SELECT * FROM Encounter e Join OpenWardStayAndAttendance o on o.encounterId = e.encounterId WHERE patientId = ? and encounterType = 0`, id);

const getPatientMedications = (id, limit) => db.all(`SELECT  * FROM PatientMedication WHERE patientId = ? limit ${limit}`, id);

export default {
getPatient,
getPatientMedications,
getPatientAdmission,
getWard,
getPatientsOnWard
};