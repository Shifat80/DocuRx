import { ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';
import { DoctorProfile, ClinicInfo } from '../../types';
import { TextField, TextAreaField } from './FormField';

interface DoctorProfileFormProps {
  doctor: DoctorProfile;
  clinic: ClinicInfo;
  onDoctorChange: (next: DoctorProfile) => void;
  onClinicChange: (next: ClinicInfo) => void;
}

export function DoctorProfileForm({
  doctor,
  clinic,
  onDoctorChange,
  onClinicChange,
}: DoctorProfileFormProps) {
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onDoctorChange({ ...doctor, logoDataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Doctor name (Bangla)"
          value={doctor.nameBn}
          onChange={(e) => onDoctorChange({ ...doctor, nameBn: e.target.value })}
        />
        <TextField
          label="Doctor name (English)"
          value={doctor.nameEn}
          onChange={(e) => onDoctorChange({ ...doctor, nameEn: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextAreaField
          label="Qualifications (Bangla, one per line)"
          rows={3}
          value={doctor.qualificationsBn.join('\n')}
          onChange={(e) =>
            onDoctorChange({ ...doctor, qualificationsBn: e.target.value.split('\n') })
          }
        />
        <TextAreaField
          label="Qualifications (English, one per line)"
          rows={3}
          value={doctor.qualificationsEn.join('\n')}
          onChange={(e) =>
            onDoctorChange({ ...doctor, qualificationsEn: e.target.value.split('\n') })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextAreaField
          label="Hospital / affiliation (Bangla, one per line)"
          rows={2}
          value={doctor.hospitalBn.join('\n')}
          onChange={(e) =>
            onDoctorChange({ ...doctor, hospitalBn: e.target.value.split('\n') })
          }
        />
        <TextAreaField
          label="Hospital / affiliation (English, one per line)"
          rows={2}
          value={doctor.hospitalEn.join('\n')}
          onChange={(e) =>
            onDoctorChange({ ...doctor, hospitalEn: e.target.value.split('\n') })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Registration no. (Bangla)"
          value={doctor.regBn}
          onChange={(e) => onDoctorChange({ ...doctor, regBn: e.target.value })}
        />
        <TextField
          label="Registration no. (English)"
          value={doctor.regEn}
          onChange={(e) => onDoctorChange({ ...doctor, regEn: e.target.value })}
        />
      </div>

      <TextField
        label="Expertise line (under logo)"
        value={doctor.expertiseBn}
        onChange={(e) => onDoctorChange({ ...doctor, expertiseBn: e.target.value })}
      />

      <div>
        <span className="block text-xs font-medium text-slate-500 mb-1">Clinic logo</span>
        <div className="flex items-center gap-3">
          {doctor.logoDataUrl ? (
            <div className="relative">
              <img
                src={doctor.logoDataUrl}
                alt="Logo preview"
                className="h-12 w-28 object-contain border border-slate-200 rounded bg-white"
              />
              <button
                type="button"
                onClick={() => onDoctorChange({ ...doctor, logoDataUrl: null })}
                className="absolute -top-2 -right-2 bg-white border border-slate-300 rounded-full p-0.5 text-slate-500 hover:text-red-600"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-1.5 text-xs text-teal-700 border border-dashed border-teal-400 rounded-md px-3 py-2 cursor-pointer hover:bg-teal-50">
              <Upload size={14} />
              Upload logo
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          )}
        </div>
      </div>

      <hr className="border-slate-200" />

      <TextField
        label="Chamber title"
        value={clinic.chamberTitleBn}
        onChange={(e) => onClinicChange({ ...clinic, chamberTitleBn: e.target.value })}
      />
      <TextField
        label="Chamber / clinic name"
        value={clinic.nameBn}
        onChange={(e) => onClinicChange({ ...clinic, nameBn: e.target.value })}
      />
      <TextField
        label="Mobile line"
        value={clinic.mobile}
        onChange={(e) => onClinicChange({ ...clinic, mobile: e.target.value })}
      />
      <TextField
        label="Visiting hours"
        value={clinic.hoursBn}
        onChange={(e) => onClinicChange({ ...clinic, hoursBn: e.target.value })}
      />
    </div>
  );
}
