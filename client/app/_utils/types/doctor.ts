export type TDoctor = {
  _id: string;
  name: string;
  designation: string;
};

export type TUpdateDoctorPayload = {
  doctorId: string;
  data: Omit<TDoctor, '_id'>;
};
