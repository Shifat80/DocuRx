import { useRef, useState } from 'react';
import { PrescriptionPad } from './components/PrescriptionPad';
import { Toolbar } from './components/Toolbar';
import { CollapsibleSection } from './components/editor/CollapsibleSection';
import { DoctorProfileForm } from './components/editor/DoctorProfileForm';
import { PatientForm } from './components/editor/PatientForm';
import { ClinicalNotesForm } from './components/editor/ClinicalNotesForm';
import { RxItemsForm } from './components/editor/RxItemsForm';
import { createDefaultPrescription } from './data/defaultPrescription';
import { useAutoScale } from './hooks/useAutoScale';
import { downloadPrescriptionPdf, sharePrescriptionPdf } from './utils/pdf';

const PAGE_WIDTH_PX = 8.5 * 96;

function buildFilename(patientName: string, date: string) {
  const safeName = patientName.trim() ? patientName.trim().replace(/\s+/g, '_') : 'Prescription';
  const safeDate = date.trim() ? date.trim().replace(/\//g, '-') : '';
  return `${safeName}${safeDate ? `_${safeDate}` : ''}.pdf`;
}

function App() {
  const [data, setData] = useState(createDefaultPrescription);
  const [busy, setBusy] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const scale = useAutoScale(previewContainerRef, PAGE_WIDTH_PX);

  const shareSupported =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (!pageRef.current) return;
    setBusy(true);
    try {
      await downloadPrescriptionPdf(
        pageRef.current,
        buildFilename(data.patient.name, data.patient.date)
      );
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async () => {
    if (!pageRef.current) return;
    setBusy(true);
    try {
      await sharePrescriptionPdf(
        pageRef.current,
        buildFilename(data.patient.name, data.patient.date)
      );
    } finally {
      setBusy(false);
    }
  };

  const handleReset = () => {
    if (confirm('Clear patient info, clinical notes and prescribed medicines?')) {
      setData((prev) => ({
        ...createDefaultPrescription(),
        doctor: prev.doctor,
        clinic: prev.clinic,
      }));
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-100">
      <Toolbar
        onPrint={handlePrint}
        onDownload={handleDownload}
        onShare={handleShare}
        onReset={handleReset}
        busy={busy}
        shareSupported={shareSupported}
      />

      <div className="flex flex-1 overflow-hidden">
        <aside className="no-print w-[380px] flex-shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 space-y-3">
          <CollapsibleSection title="Doctor & clinic profile">
            <DoctorProfileForm
              doctor={data.doctor}
              clinic={data.clinic}
              onDoctorChange={(doctor) => setData((prev) => ({ ...prev, doctor }))}
              onClinicChange={(clinic) => setData((prev) => ({ ...prev, clinic }))}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Patient information" defaultOpen>
            <PatientForm
              patient={data.patient}
              onChange={(patient) => setData((prev) => ({ ...prev, patient }))}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Clinical notes" defaultOpen>
            <ClinicalNotesForm
              notes={data.notes}
              onChange={(notes) => setData((prev) => ({ ...prev, notes }))}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Prescribed medicines (Rx)" defaultOpen>
            <RxItemsForm
              items={data.rxItems}
              onChange={(rxItems) => setData((prev) => ({ ...prev, rxItems }))}
            />
          </CollapsibleSection>
        </aside>

        <main
          ref={previewContainerRef}
          className="flex flex-1 items-start justify-center overflow-auto p-6"
        >
          <div
            className="preview-scale-wrapper"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              height: 11 * 96 * scale,
            }}
          >
            <PrescriptionPad data={data} ref={pageRef} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
