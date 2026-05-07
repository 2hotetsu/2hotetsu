"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './PdfPreview.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  file: string;
}

export default function PdfPreview({ file }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className={styles.pdfContainer}>
      <a href={file} target="_blank" rel="noopener noreferrer" className={styles.documentLink}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className={styles.document}
          loading={<div className={styles.loading}>Loading PDF...</div>}
          error={<div className={styles.loading}>Failed to load PDF.</div>}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className={styles.page}
          />
        </Document>
      </a>
      
      {numPages && numPages > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            className={styles.button}
          >
            Prev
          </button>
          <span className={styles.pageInfo}>
            {pageNumber} of {numPages}
          </span>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            className={styles.button}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
