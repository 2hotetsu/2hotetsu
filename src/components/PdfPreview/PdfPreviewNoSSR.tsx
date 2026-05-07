"use client";

import dynamic from 'next/dynamic';

const PdfPreview = dynamic(() => import('./PdfPreview'), {
  ssr: false,
  loading: () => <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading PDF…</div>,
});

export default function PdfPreviewNoSSR({ file }: { file: string }) {
  return <PdfPreview file={file} />;
}
