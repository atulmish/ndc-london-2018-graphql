import { patient, ward, medications, patients, admission } from './query';
import { dischargePatient } from './mutation';
import { patientDischarged } from './subscription';

const resolvers = {
	Query: {
        patient,
        ward
    },
    Patient:{
        medications,
        admission
    },
    Ward:{patients},
    Gender:{
        MALE:0,
        FEMALE:1
    }
};

export default resolvers;