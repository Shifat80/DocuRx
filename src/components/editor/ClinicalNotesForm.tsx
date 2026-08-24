import { ClinicalNotes } from '../../types';
import { TextField, TextAreaField } from './FormField';

interface ClinicalNotesFormProps {
  notes: ClinicalNotes;
  onChange: (next: ClinicalNotes) => void;
}

export function ClinicalNotesForm({ notes, onChange }: ClinicalNotesFormProps) {
  const set = <K extends keyof ClinicalNotes>(key: K, value: ClinicalNotes[K]) =>
    onChange({ ...notes, [key]: value });

  return (
    <div className="space-y-3">
      <TextAreaField
        label="Chief complaint (C/C)"
        rows={2}
        value={notes.chiefComplaint}
        onChange={(e) => set('chiefComplaint', e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3">
        <TextField label="O/E" value={notes.oe} onChange={(e) => set('oe', e.target.value)} />
        <TextField label="BP" value={notes.bp} onChange={(e) => set('bp', e.target.value)} />
        <TextField label="Pulse (P)" value={notes.pulse} onChange={(e) => set('pulse', e.target.value)} />
        <TextField
          label="Temperature (Tm)"
          value={notes.temperature}
          onChange={(e) => set('temperature', e.target.value)}
        />
        <TextField label="H/L" value={notes.hl} onChange={(e) => set('hl', e.target.value)} />
        <TextField
          label="Anaemia"
          value={notes.anaemia}
          onChange={(e) => set('anaemia', e.target.value)}
        />
        <TextField
          label="Jaundice"
          value={notes.jaundice}
          onChange={(e) => set('jaundice', e.target.value)}
        />
        <TextField
          label="Dehydration"
          value={notes.dehydration}
          onChange={(e) => set('dehydration', e.target.value)}
        />
      </div>

      <TextAreaField
        label="Diagnosis (Dx)"
        rows={2}
        value={notes.diagnosis}
        onChange={(e) => set('diagnosis', e.target.value)}
      />
      <TextAreaField
        label="Advice (Adv)"
        rows={2}
        value={notes.advice}
        onChange={(e) => set('advice', e.target.value)}
      />
    </div>
  );
}
