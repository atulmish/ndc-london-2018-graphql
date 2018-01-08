import db from 'sqlite';
import _ from 'lodash';

const getPatient = id => db.get(`SELECT * FROM Patient WHERE identifier = ?`, id);

const getWard = id => db.get(`SELECT * FROM Ward WHERE LOWER(code) = ?`, id);

const getPatientsOnWard = id => db.all(`SELECT * FROM PatientsOnWard_View WHERE wardId = ?`, id);

const getPatientAdmission = (ids) => {
    return db.all(`SELECT * FROM Encounter e Join OpenWardStayAndAttendance o on o.encounterId = e.encounterId WHERE patientId IN (${parameterize(ids)}) and encounterType = 0`)
      .then(rows => {
        const admissionByPatientId = _.keyBy(rows, "patientId");
        return ids.map(patientId => admissionByPatientId[patientId]);
    });
};

const getPatientMedications = (id, limit) => db.all(`SELECT  * FROM PatientMedication WHERE patientId = ? limit ${limit}`, id);

const dischargePatient = input => {
  let owsa = db.run(`DELETE FROM OpenWardStayAndAttendance WHERE EncounterId = ?`, input.encounterId);
  let discharge = db.run(`INSERT INTO Encounter (patientId, wardId, consultant, date, encounterType) VALUES (${input.patientId},${input.wardId}, '${input.consultant}', '${input.dischargeDate}', 1)`);

  return Promise.all([owsa, discharge]).then(() => input);
};

const parameterize = params => asArray(params).map(param => param).join();
const asArray = a => Array.isArray(a) ? a : [a];

export default {
  getPatient,
  getWard,
  getPatientMedications,
  getPatientsOnWard,
  dischargePatient,
  getPatientAdmission
};