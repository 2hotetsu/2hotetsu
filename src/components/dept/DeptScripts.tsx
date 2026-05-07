'use client';

import { useEffect } from 'react';

const SCRIPTS = [
  '/js-dept/jquery.hoverIntent.minified.js',
  '/js-dept/jquery.easing.1.3.js',
  '/js-dept/diapo.min.js',
  '/js-dept/function.js',
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // avoid double-loading
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export default function DeptScripts() {
  useEffect(() => {
    (async () => {
      for (const src of SCRIPTS) {
        await loadScript(src);
      }
    })();
  }, []);

  return null;
}
