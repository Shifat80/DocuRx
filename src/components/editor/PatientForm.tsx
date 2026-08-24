import { PatientInfo } from '../../types';
import { TextField } from './FormField';

interface PatientFormProps {
  patient: PatientInfo;
  onChange: (next: PatientInfo) => void;
}

export function PatientForm({ patient, onChange }: PatientFormProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <TextField
        label="Patient name"
        value={patient.name}
        onChange={(e) => onChange({ ...patient, name: e.target.value })}
      />
      <TextField
        label="Date"
        value={patient.date}
        onChange={(e) => onChange({ ...patient, date: e.target.value })}
      />
      <TextField
        label="Age"
        value={patient.age}
        onChange={(e) => onChange({ ...patient, age: e.target.value })}
      />
      <TextField
        label="Weight"
        value={patient.weight}
        onChange={(e) => onChange({ ...patient, weight: e.target.value })}
      />
    </div>
  );
}
