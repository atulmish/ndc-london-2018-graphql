import {pubsub, topics} from '../../subscriptions';
import { withFilter } from 'graphql-subscriptions';

const patientDischarged = {
    subscribe: withFilter(() => pubsub.asyncIterator(topics.PATIENT_DISCHARGED), (payload, variables) => {
        return payload.patientDischarged.wardCode === variables.wardCode;
      })
}

export{
    patientDischarged
} 

