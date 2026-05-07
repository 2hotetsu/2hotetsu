"use client";

import dynamic from 'next/dynamic';

// pdfjs uses browser-only APIs (DOMMatrix, canvas, etc.)
// ssr: false prevents the module from being evaluated on the server during prerendering
const PdfCardPreview = dynamic(() => import('./PdfCardPreview'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        flexShrink: 0,
        aspectRatio: '16 / 10',
        background: '#f0f4ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        color: '#888',
      }}
    >
      PDF
    </div>
  ),
});

export default function PdfCardPreviewNoSSR({ file }: { file: string }) {
  return <PdfCardPreview file={file} />;
}
