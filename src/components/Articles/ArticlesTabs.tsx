'use client';

import { useState } from 'react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import styles from './Articles.module.css';

export type ArticleTab = {
  _id: string;
  title: string;
  contentTitle?: string;
  body: import('next-sanity').PortableTextBlock[];
  images?: { asset: { _ref: string; _type: string }; alt?: string }[];
};

export default function ArticlesTabs({ tabs }: { tabs: ArticleTab[] }) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?._id ?? '');

  if (tabs.length === 0) return null;

  const activeTab = tabs.find((t) => t._id === activeId) ?? tabs[0];

  return (
    <div className={styles.articlesLayout}>
      <div className={styles.articlesMenu}>
        {tabs.map((tab) => (
          <button
            key={tab._id}
            className={activeId === tab._id ? styles.activeMenuBtn : styles.menuBtn}
            onClick={() => setActiveId(tab._id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className={styles.articlesContent}>
        <div className={styles.contentBlock}>
          {activeTab.contentTitle && <h4>{activeTab.contentTitle}</h4>}
          {activeTab.body && <PortableText value={activeTab.body} />}
          {activeTab.images && activeTab.images.length > 0 && (
            <div className={styles.images}>
              {activeTab.images.map((img, i) => (
                <Image
                  key={i}
                  src={urlForImage(img).width(640).url()}
                  alt={img.alt || ''}
                  width={640}
                  height={480}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
