"use client";

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './PdfCardPreview.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfCardPreviewProps {
  file: string;
}

export default function PdfCardPreview({ file }: PdfCardPreviewProps) {
  return (
    <div className={styles.wrapper}>
      <Document
        file={file}
        className={styles.document}
        loading={<div className={styles.loading}>Loading…</div>}
        error={<div className={styles.loading}>PDF</div>}
      >
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className={styles.page}
        />
      </Document>
    </div>
  );
}
