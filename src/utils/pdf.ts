import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PAGE_WIDTH_IN = 8.5;
const PAGE_HEIGHT_IN = 11;
const PAGE_WIDTH_PX = PAGE_WIDTH_IN * 96;
const PAGE_HEIGHT_PX = PAGE_HEIGHT_IN * 96;

async function renderPageToCanvas(page: HTMLElement): Promise<HTMLCanvasElement> {
  // The on-screen preview is scaled down on small screens. Capture an
  // unscaled copy so mobile browsers produce the same Letter-sized PDF as
  // desktop browsers instead of rasterising the transformed preview.
  const captureHost = document.createElement('div');
  const pageCopy = page.cloneNode(true) as HTMLElement;

  captureHost.style.cssText = [
    'position: fixed',
    'left: -100000px',
    'top: 0',
    `width: ${PAGE_WIDTH_PX}px`,
    `height: ${PAGE_HEIGHT_PX}px`,
    'overflow: hidden',
    'pointer-events: none',
  ].join(';');
  pageCopy.style.transform = 'none';
  pageCopy.style.boxShadow = 'none';
  captureHost.appendChild(pageCopy);
  document.body.appendChild(captureHost);

  try {
    await document.fonts?.ready;
    return await html2canvas(pageCopy, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: PAGE_WIDTH_PX,
      height: PAGE_HEIGHT_PX,
      windowWidth: PAGE_WIDTH_PX,
      windowHeight: PAGE_HEIGHT_PX,
      scrollX: 0,
      scrollY: 0,
    });
  } finally {
    captureHost.remove();
  }
}

export async function buildPrescriptionPdf(page: HTMLElement): Promise<jsPDF> {
  const canvas = await renderPageToCanvas(page);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
  pdf.addImage(imgData, 'PNG', 0, 0, PAGE_WIDTH_IN, PAGE_HEIGHT_IN);
  return pdf;
}

export async function downloadPrescriptionPdf(page: HTMLElement, filename: string) {
  const pdf = await buildPrescriptionPdf(page);
  pdf.save(filename);
}

export async function sharePrescriptionPdf(
  page: HTMLElement,
  filename: string
): Promise<'shared' | 'unsupported'> {
  const pdf = await buildPrescriptionPdf(page);
  const blob = pdf.output('blob');
  const file = new File([blob], filename, { type: 'application/pdf' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: filename,
    });
    return 'shared';
  }

  pdf.save(filename);
  return 'unsupported';
}
