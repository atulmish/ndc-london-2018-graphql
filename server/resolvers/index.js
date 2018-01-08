import { patient, ward, medications, patients, admission } from './query';
import { dischargePatient } from './mutation';
import { patientDischarged } from './subscription';

const resolvers = {
	Query: {
        patient,
        ward
    },
	Mutation: {
        dischargePatient
    },
	Subscription: {
        patientDischarged
    },
    Patient:{
        medications,
        admission
    },
    Ward:{patients},
    Gender:{
        MALE:0,
        FEMALE:1,
        NOTSPECIFICED:2
    }
};

export default resolvers;
 