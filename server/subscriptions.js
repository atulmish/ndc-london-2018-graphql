import { PubSub } from 'graphql-subscriptions';

export const topics = {
    PATIENT_DISCHARGED : "patientDischarged"
 };

export const pubsub = new PubSub();
