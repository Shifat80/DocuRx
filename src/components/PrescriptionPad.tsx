import { forwardRef } from 'react';
import { PrescriptionData } from '../types';

interface PrescriptionPadProps {
  data: PrescriptionData;
}

const Filled = ({ value, minWidth = '0.6in' }: { value: string; minWidth?: string }) => (
  <span className="field-blank" style={{ minWidth }}>
    {value}
  </span>
);

export const PrescriptionPad = forwardRef<HTMLDivElement, PrescriptionPadProps>(
  ({ data }, ref) => {
    const { doctor, clinic, patient, notes, rxItems } = data;
    const visibleRx = rxItems.filter((item) => item.medicine.trim().length > 0);
    const nonEmpty = (lines: string[]) => lines.filter((line) => line.trim().length > 0);

    return (
      <div className="prescription-page" ref={ref}>
        {/* ===================== HEADER ===================== */}
        <header className="header">
          <div className="doctor-block bn">
            <p className="doctor-name">{doctor.nameBn}</p>
            {nonEmpty(doctor.qualificationsBn).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            {nonEmpty(doctor.hospitalBn).map((line, i) => (
              <p className="hospital-line" key={i}>
                {line}
              </p>
            ))}
            <p className="reg-line">{doctor.regBn}</p>
          </div>

          <div className="logo-block">
            {doctor.logoDataUrl ? (
              <img className="logo-img" src={doctor.logoDataUrl} alt="Clinic Logo" />
            ) : (
              <div className="logo-placeholder" />
            )}
            <p className="expertise-line">{doctor.expertiseBn}</p>
          </div>

          <div className="doctor-block en">
            <p className="doctor-name">{doctor.nameEn}</p>
            {nonEmpty(doctor.qualificationsEn).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            {nonEmpty(doctor.hospitalEn).map((line, i) => (
              <p className="hospital-line" key={i}>
                {line}
              </p>
            ))}
            <p className="reg-line">{doctor.regEn}</p>
          </div>
        </header>

        {/* ================= PATIENT INFO ROW ================= */}
        <div className="patient-row">
          <div className="patient-field">
            Name: <Filled value={patient.name} minWidth="2in" />
          </div>
          <div className="patient-field">
            Age: <Filled value={patient.age} minWidth="0.5in" />
          </div>
          <div className="patient-field">
            Weight: <Filled value={patient.weight} minWidth="0.5in" />
          </div>
          <div className="patient-field date-field">
            Date: <Filled value={patient.date} minWidth="0.8in" />
          </div>
        </div>

        {/* ================= MAIN PRESCRIPTION AREA ================= */}
        <div className="main-area">
          {/* LEFT: clinical notes */}
          <div className="left-panel">
            <div className="cc-block">
              <span className="field-label">C/C :</span>
              <div className="cc-writing-area">{notes.chiefComplaint}</div>
            </div>

            <div className="vitals-group">
              <div className="field-line">
                <span className="field-label">O/E:</span>
                <Filled value={notes.oe} />
              </div>
              <div className="field-line">
                <span className="field-label">BP :</span>
                <Filled value={notes.bp} />
              </div>
              <div className="field-line">
                <span className="field-label">P :</span>
                <Filled value={notes.pulse} />
              </div>
              <div className="field-line">
                <span className="field-label">Tm :</span>
                <Filled value={notes.temperature} />
              </div>
              <div className="field-line">
                <span className="field-label">H/L :</span>
                <Filled value={notes.hl} />
              </div>
              <div className="field-line">
                <span className="field-label">Anaemia :</span>
                <Filled value={notes.anaemia} />
              </div>
              <div className="field-line">
                <span className="field-label">Jaundice :</span>
                <Filled value={notes.jaundice} />
              </div>
              <div className="field-line">
                <span className="field-label">Dehydration :</span>
                <Filled value={notes.dehydration} />
              </div>
            </div>

            <div className="spacer-line" />

            <div className="dx-adv-group">
              <div className="field-line">
                <span className="field-label">Dx :</span>
                <Filled value={notes.diagnosis} />
              </div>
              <div className="field-line">
                <span className="field-label">Adv :</span>
                <Filled value={notes.advice} />
              </div>
            </div>
          </div>

          {/* RIGHT: Rx list */}
          <div className="right-panel">
            <div className="rx-mark">Rx..</div>
            <ol className="rx-list">
              {visibleRx.map((item, index) => (
                <li className="rx-item" key={item.id}>
                  <span className="rx-index">{index + 1}.</span>
                  <div className="rx-item-body">
                    <span className="rx-medicine">{item.medicine}</span>
                    {(item.dosage || item.duration || item.instruction) && (
                      <span className="rx-meta">
                        {[item.dosage, item.duration, item.instruction]
                          .filter(Boolean)
                          .join(' — ')}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="footer">
          <p className="chamber-title">{clinic.chamberTitleBn}</p>
          <p className="addr-line">{clinic.nameBn}</p>
          <p className="mobile-line">{clinic.mobile}</p>
          <p className="addr-line">{clinic.hoursBn}</p>
        </footer>
      </div>
    );
  }
);

PrescriptionPad.displayName = 'PrescriptionPad';
