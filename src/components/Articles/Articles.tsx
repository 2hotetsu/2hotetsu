'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from "./Articles.module.css";
import Link from 'next/link';
import Image from 'next/image';
import xray from '@/img/articles/xray.jpg';
import results from '@/img/articles/results.png';
import pdfDownload from '@/img/icons/pdf.png'


export default function Articles() {
    const t = useTranslations('Articles');
    const [activeTab, setActiveTab] = useState(1);

    return (
        <section className={styles.sectionAlt} id="articles">
          <div className={styles.sectionAltContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t('articlesTitle')}</h3>
            </div>
            
            <div className={styles.articlesLayout}>
              <div className={styles.articlesMenu}>
                <button 
                  className={activeTab === 1 ? styles.activeMenuBtn : styles.menuBtn}
                  onClick={() => setActiveTab(1)}
                >
                  {t('menu1')}
                </button>
                <button 
                  className={activeTab === 2 ? styles.activeMenuBtn : styles.menuBtn}
                  onClick={() => setActiveTab(2)}
                >
                  {t('menu2')}
                </button>
                <button 
                  className={activeTab === 3 ? styles.activeMenuBtn : styles.menuBtn}
                  onClick={() => setActiveTab(3)}
                >
                  {t('menu3')}
                </button>
              </div>

              <div className={styles.articlesContent}>
                {activeTab === 1 && (
                  <div className={styles.contentBlock}>
                    <h4>{t('content1Title')}</h4>
                    <p>{t('content1P1')}</p>
                    <p>{t('content1P2')}</p>
                    <p>{t('content1P3')}</p>
                    <Link href="https://www.jsaweb.jp/modules/citizen_qa/index.php?content_id=11" target="_blank">{t('content1P4')}</Link>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className={styles.contentBlock}>
                    <h4>{t('content2Title')}</h4>
                    <p>{t('content2P1')}</p>
                    <p>{t('content2P2')}</p>
                    <p>{t('content2P3')}</p>
                    <div className={styles.images}>
                        <Image src={xray} alt="" width={320} height={240} />
                        <Image src={results} alt="" width={320} height={240} />
                    </div>
                  </div>
                )}
                {activeTab === 3 && (
                  <div className={styles.contentBlock}>
                    <h4>{t('content3Title')}</h4>
                    <p>{t('content3P1')}</p>
                    <p>{t('content3P2')}</p>
                    <p>{t('content3P3')}</p>
                    <ul>
                        <li>{t('content3P4')}</li>
                        <li>{t('content3P5')}</li>
                        <li>{t('content3P6')}</li>
                        <li>{t('content3P7')}</li>
                        <li>{t('content3P8')}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.moreInfo}>
                <Link href="/documents/徳島大学病院_金属アレルギー外来_パッチテスト.pdf" target="_blank" rel="noopener noreferrer">
                    <p>{t('moreInfo')}</p>
                    <Image src={pdfDownload} alt="PDF Download" width={20} height={20} />
                </Link>
            </div>

          </div>
        </section>
    );
}