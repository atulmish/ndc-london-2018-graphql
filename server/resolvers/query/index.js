const patient = (obj, args, context) => {
  return context.Patient.getByIdentifier(args.identifier);
};

const medications = (obj, args, context) => {
    return context.Medication.getByPatientIdentifier(obj.patientId, args.limit);
};

const ward = (obj, args, context) => {
  return context.Ward.getByCode(args.code.toLowerCase());
};

const patients = (obj, args, context) => {
    return context.Patient.getPatientsOnWard(obj.wardId);
};

const admission = (obj, args, context) => {
  return context.Admission.getAdmission(obj.patientId); 
};

export {
  patient,
  medications,
  ward,
  patients,
  admission
};