import {pubsub, topics} from '../../subscriptions';

const dischargePatient = (obj, {input}, context) => {
    return context.Patient.discharge(input).then(patient => {                          
            pubsub.publish(topics.PATIENT_DISCHARGED, {
                'patientDischarged': patient
            });
            return patient;
        })
        .catch(e => {
            console.error(e);
        });
};

export {dischargePatient};