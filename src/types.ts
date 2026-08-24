export interface DoctorProfile {
  nameBn: string;
  qualificationsBn: string[];
  hospitalBn: string[];
  regBn: string;
  nameEn: string;
  qualificationsEn: string[];
  hospitalEn: string[];
  regEn: string;
  expertiseBn: string;
  logoDataUrl: string | null;
}

export interface ClinicInfo {
  chamberTitleBn: string;
  nameBn: string;
  mobile: string;
  hoursBn: string;
}

export interface PatientInfo {
  name: string;
  age: string;
  weight: string;
  date: string;
}

export interface ClinicalNotes {
  chiefComplaint: string;
  oe: string;
  bp: string;
  pulse: string;
  temperature: string;
  hl: string;
  anaemia: string;
  jaundice: string;
  dehydration: string;
  diagnosis: string;
  advice: string;
}

export interface RxItem {
  id: string;
  medicine: string;
  dosage: string;
  duration: string;
  instruction: string;
}

export interface PrescriptionData {
  doctor: DoctorProfile;
  clinic: ClinicInfo;
  patient: PatientInfo;
  notes: ClinicalNotes;
  rxItems: RxItem[];
}
