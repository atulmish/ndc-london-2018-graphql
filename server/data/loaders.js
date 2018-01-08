import DataLoader from 'dataloader';

import Admission from './models/Admission';

const admissionLoader = new DataLoader(ids => Admission.getAdmission(ids));

export default {
    admissionLoader
};