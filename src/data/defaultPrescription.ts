import { format } from 'date-fns';
import { PrescriptionData } from '../types';
import { createId } from '../utils/id';

export function createDefaultPrescription(): PrescriptionData {
  return {
    doctor: {
      nameBn: 'ডাঃ মোঃ তানভীর হায়দার শাওন',
      qualificationsBn: ['এমবিবিএস (এফ এম সি)', 'এফসিপিএস (মেডিসিন-এফপি)', 'এক্স -এমও'],
      hospitalBn: ['স্কয়ার হাসপাতাল,ঢাকা।'],
      regBn: 'বিএমডিসি রেজি. নংঃ এ ১২৫৯৯৮',
      nameEn: 'Dr. Md. Tanbir Haidar Shawon',
      qualificationsEn: ['MBBS (FMC)', 'FCPS-FP (Medicine)'],
      hospitalEn: ['Ex-MO- Square Hospital,', 'Dhaka'],
      regEn: 'BMDC Reg No : A125998',
      expertiseBn: 'মেডিসিন, চর্ম-যৌন ও এলার্জি রোগে অভিজ্ঞ',
      logoDataUrl: null,
    },
    clinic: {
      chamberTitleBn: 'চেম্বার ঠিকানাঃ',
      nameBn: 'ইসডো হাসপাতাল, বরুড়া ',
      mobile: 'মোবাইলঃ ০১৭৬০-৮৯৫৯৪১ ',
      hoursBn: 'প্রতি শুক্রবার বিকাল ৩টা থেকে সন্ধ্যা ৭টা পর্যন্ত',
    },
    patient: {
      name: '',
      age: '',
      weight: '',
      date: format(new Date(), 'dd/MM/yyyy'),
    },
    notes: {
      chiefComplaint: '',
      oe: '',
      bp: '',
      pulse: '',
      temperature: '',
      hl: '',
      anaemia: '',
      jaundice: '',
      dehydration: '',
      diagnosis: '',
      advice: '',
    },
    rxItems: [
      { id: createId(), medicine: '', dosage: '', duration: '', instruction: '' },
    ],
  };
}
